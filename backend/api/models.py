from django.db import models
from django.contrib.auth.models import User


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    reps = models.PositiveIntegerField()
    performed_at = models.DateTimeField(auto_now_add=True)
    # foreign key links user with data that belongs to them
    lifter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exercises")

    def __str__(self):
        # Would display as: Bench Press - 100 x 5 on 2025-04-10
        return f"{self.name} - {self.weight} x {self.reps} on {self.performed_at.date()}"