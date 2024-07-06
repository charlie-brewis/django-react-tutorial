from rest_framework import serializers
from .models import Room

# Serialisers translate python model classes into JSON data and vice versa
# This enables our frontend to read from these models very easily

# Inherits from the ModelSerializer class from the rest_framework module
class RoomSerializer(serializers.ModelSerializer):
    '''This class is used to serialize and deserialize Django models'''
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    '''This class is used to serialise a request into a Django format'''
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    '''This class is used to serialise a request into a Django format'''
    # Redefine the code field to not require validation, i.e., unique != True
    code = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')