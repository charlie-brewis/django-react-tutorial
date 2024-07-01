from rest_framework import serializers
from .models import Room

# Serialisers translate python model classes into JSON data
# This enables our frontend to read from these models very easily

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')