from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ExerciseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Exercise

# Create your views here.
class ExerciseListCreate(generics.ListCreateAPIView):
    serializer_class = ExerciseSerializer
    # can't call this root unless a valid JWT token is passed
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        # filters notes by authenticated user
        return Exercise.objects.filter(lifter=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(lifter=self.request.user)
        else:
            print(serializer.errors) 
    
class ExerciseDelete(generics.DestroyAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Exercise.objects.filter(lifter=user)
    
class CreateUserView(generics.CreateAPIView):
    # makes sure we don't create a user that already exists
    queryset = User.objects.all()
    # tells view what data is needed to make a new user (username, password)
    serializer_class = UserSerializer
    # allows non-authenticated users to create a new account
    permission_classes = [AllowAny]