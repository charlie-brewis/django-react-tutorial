from django.urls import path
from .views import index

urlpatterns = [
    # Render index template as default
    path('', index),
    path('join', index),
    path('create', index),
    # `<str:roomCode>` is a path parameter that will be passed to the index view function as `roomCode`
    path('room/<str:roomCode>', index),
]
