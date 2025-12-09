"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import os

def api_doc_view(request):
    codespace = os.environ.get('CODESPACE_NAME', 'localhost')
    base_url = f'https://{codespace}-8000.app.github.dev' if codespace != 'localhost' else 'http://localhost:8000'
    from django.http import JsonResponse
    return JsonResponse({
        "message": "Welcome to the Octofit Tracker API!",
        "endpoints": {
            "activities": f"{base_url}/api/activities/",
            "teams": f"{base_url}/api/teams/",
            "workouts": f"{base_url}/api/workouts/",
            "leaderboard": f"{base_url}/api/leaderboard/",
            "users": f"{base_url}/api/users/"
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tracker.urls')),
    path('api/', include('tracker.urls')),
    path('api/doc/', api_doc_view),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]
