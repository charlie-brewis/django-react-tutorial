from django.urls import path
from .views import index

urlpatterns = [
    # Render index template as default
    path('', index),
    path('join', index),
    path('create', index),
]
