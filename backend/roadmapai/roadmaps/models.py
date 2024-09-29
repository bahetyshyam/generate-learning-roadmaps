import uuid

from django.db import models
from django.contrib.auth.models import User


class Roadmap(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    roadmap_json = models.JSONField()

class UserRoadmap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name='roadmaps')
    topic = models.CharField(max_length=255)
    expertise = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('user', 'topic', 'expertise')