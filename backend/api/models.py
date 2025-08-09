import uuid
from django.db import models


class StepperConfig(models.Model):
    name = models.CharField(max_length=100, unique=True)
    steps = models.JSONField(default=list)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    data = models.JSONField(default=dict)
    status = models.CharField(max_length=32, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Trip {self.id}"


class TripStep(models.Model):
    trip = models.ForeignKey(Trip, related_name='steps', on_delete=models.CASCADE)
    key = models.CharField(max_length=64)
    data = models.JSONField(default=dict)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('trip', 'key')
        ordering = ['order', 'id']

    def __str__(self) -> str:
        return f"{self.trip_id}:{self.key}"
