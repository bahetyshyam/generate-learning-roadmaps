from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserRoadmap, Roadmap


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class RoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = ('id', 'roadmap_json',)

class UserRoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoadmap
        fields = ('user', 'roadmap', 'topic', 'expertise',)