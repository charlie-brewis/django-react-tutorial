from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer

# A view is a function that takes a web request and returns a web response
# These are also known as request handlers or request-response handlers


# This is a view that inherits from the ListAPIView class from the rest_framework module
# This class is used to return to us a list of all rooms
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer



# The APIView class gives us standard GET POST PUT DELETE methods that we can then override
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # If the current user doesnt have an active session, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # Serialize the request data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            # Use the session key as the host
            host = self.request.session.session_key

            queryset = Room.objects.filter(host=host)
            # Check if there is already a room with the host in the database
            if queryset.exists():
                # If there is, update the room record with the new values
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # Store the room code in the user session
                self.request.session['room_code'] = room.code
                # Return the serialized room data as a response
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # Else, create a new room
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        # If the request data is invalid, return a 400 error
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        # Get the room code from the url request
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            # If the room exists, return the serialized room data
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                # If the current user is the host of the room, set is_host to True
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    


class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        # If the current user doesnt have an active session, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                # Store the room code in the session, a session is a way to store information about a user from one request to another
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find room code key'}, status=status.HTTP_400_BAD_REQUEST)