from django.urls import path
from . import views

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-list"),
    path("exercises/delete/<int:pk>", views.ExerciseDelete.as_view(), name="delete-exercise")
]