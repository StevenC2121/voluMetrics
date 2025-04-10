from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Exercise

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields to serialize when accepting a new user and returning a new user
        fields = ["id", "username", "password"]
        # accepts password but doesn't return it when giving info about a user
        extra_kwargs = {"password": {"write_only": True}}
    
    # creates a new user using validated data from the above serializer
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "weight", "reps", "performed_at", "lifter"]