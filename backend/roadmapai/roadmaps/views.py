import openai
import json

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import UserRoadmap, Roadmap
from .serializers import UserSerializer, UserRoadmapSerializer, RoadmapSerializer


client = openai.OpenAI(api_key='sk-iWx77HGmRzPsAJzG-hPYdWctB4w6vCNhgv6YuwUTjqT3BlbkFJCtmq153YgvcDeyo-oLDAGyec3F5zuoOpWM3XHIUNoA')

class LoginViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(username=username).first()

        if user:
            # User exists, attempt to authenticate
            authenticated_user = authenticate(username=username, password=password)
            if authenticated_user:
                login(request, authenticated_user)
                return Response({'user_id': user.id, 'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # User doesn't exist, create new user
            try:
                new_user = User.objects.create_user(username=username, email=f"{username}@example.com", password=password)
                login(request, new_user)
                return Response({'user_id': new_user.id, 'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class UserRoadmapViewset(viewsets.ModelViewSet):
    serializer_class = UserRoadmapSerializer

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        if user_id is None:
            queryset = UserRoadmap.objects.all()
        else:
            queryset = UserRoadmap.objects.filter(user_id=user_id)
        return queryset

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        topic = request.data.get('topic').strip()
        lang = request.data.get('language')
        expertise = int(request.data.get('expertise'))

        # call ChatGPT API to get response
        roadmap_json = self.generate_roadmap_with_chatgpt(topic, expertise, lang)
        # roadmap_json = {"topic": topic, "expertise": expertise}
        if not roadmap_json:
            return Response({"error": "Failed to generate roadmap"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Create Roadmap instance using serializer
        roadmap_data = {
            'roadmap_json': roadmap_json
        }
        roadmap_serializer = RoadmapSerializer(data=roadmap_data)
        if roadmap_serializer.is_valid():
            roadmap = roadmap_serializer.save()
        else:
            return Response(roadmap_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create UserRoadmap instance using serializer
        user_roadmap_data = {
            'user': user_id,
            'roadmap': roadmap.id,
            'topic': topic,
            'expertise': expertise
        }
        user_roadmap_serializer = UserRoadmapSerializer(data=user_roadmap_data)
        if user_roadmap_serializer.is_valid():
            user_roadmap = user_roadmap_serializer.save()
        else:
            roadmap.delete()
            return Response(user_roadmap_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            "roadmap": roadmap_serializer.data
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
    
    def generate_roadmap_with_chatgpt(self, topic, expertise, lang):
        sample_tree_json = "{title: string, description: string, resourceTasks: [{ name: string, resourceLink: string, completed: false }], children: TreeNode[]}"
        # Prepare the prompt for ChatGPT
        prompt = f"Create a JSON roadmap for {topic} in the format: {sample_tree_json} Mark completed field as false. Current expertise level: {expertise} (0 = novice, 10 = expert). Use the language corresponding to the i18n code: {lang}. Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation."

        try:
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-3.5-turbo-0125",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Extract the generated roadmap JSON from the response
            roadmap_json = response.choices[0].message.content
            # print(roadmap_json)

            # You might want to add some validation here to ensure the response is valid JSON
            roadmap_json = json.loads(roadmap_json)
            return roadmap_json

        except Exception as e:
            # Handle any errors from the API call
            print(f"Error generating roadmap: {str(e)}")
            return None
        
class RoadmapViewset(viewsets.ModelViewSet):
    """
        API endpoint that allows roadmaps to be viewed or edited.
    """
    queryset = Roadmap.objects.all()
    serializer_class = RoadmapSerializer
