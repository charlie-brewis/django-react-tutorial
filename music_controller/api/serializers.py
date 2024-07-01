from rest_framework import serializers
from .models import Room

# Serialisers translate python model classes into JSON data
# This enables our frontend to read from these models very easily

# Inherits from the ModelSerializer class from the rest_framework module
# This class is used to serialize and deserialize Django models
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')