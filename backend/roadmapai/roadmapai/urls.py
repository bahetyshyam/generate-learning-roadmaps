from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from roadmaps import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'userroadmaps', views.UserRoadmapViewset, basename='userroadmaps')
router.register(r'roadmaps', views.RoadmapViewset)
router.register(r'', views.LoginViewSet, basename='login')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]