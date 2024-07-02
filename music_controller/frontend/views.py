from django.shortcuts import render

# Renders index.html template
def index(request, *args, **kwargs):
    # 'templates/' is not needed as Django looks for templates in the 'templates' directory by default
    return render(request, 'frontend/index.html')
