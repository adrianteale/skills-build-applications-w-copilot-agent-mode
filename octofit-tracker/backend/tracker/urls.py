
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ActivityViewSet, TeamViewSet, WorkoutViewSet, LeaderboardViewSet, UserViewSet, api_root
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'workouts', WorkoutViewSet, basename='workout')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
