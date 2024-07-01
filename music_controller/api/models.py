from django.db import models
import string
import random

def generate_unique_code():
    ''' Generate a unique code for a room '''
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        # Check if the code is already in the database
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

# Models are just a layer of abstraction of database tables
# They allow us to define entities using python classes
#* Note by convention, in Django, we want fat models and thin views
class Room(models.Model):
    '''
    An entity representing a room that users can join to listen to music together
    Fields:
        - code: a unique code that users can use to join the room
        - host: the user that created the room
        - guest_can_pause: a boolean indicating whether guests can pause the music
        - votes_to_skip: the number of votes needed to skip a song
        - created_at: the time the room was created
    '''
    code = models.CharField(max_length=8, default="", unique=True)
    # host is unqiue because we don't want multiple rooms with the same host
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
