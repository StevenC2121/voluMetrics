from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # makes sure we don't create a user that already exists
    queryset = User.objects.all()
    # tells view what data is needed to make a new user (username, password)
    serializer_class = UserSerializer
    # allows non-authenticated users to create a new account
    permission_classes = [AllowAny]