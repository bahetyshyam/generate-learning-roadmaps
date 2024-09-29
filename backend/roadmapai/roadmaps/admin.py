from django.contrib import admin

from .models import Roadmap, UserRoadmap

admin.site.register(Roadmap)
admin.site.register(UserRoadmap)
