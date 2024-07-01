from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer

# A view is a function that takes a web request and returns a web response
# These are also known as request handlers or request-response handlers


# This is a view that inherits from the ListAPIView class from the rest_framework module
# This class is used to return to us a list of all rooms
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer