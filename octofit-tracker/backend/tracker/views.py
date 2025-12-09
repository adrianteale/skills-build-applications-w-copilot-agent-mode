
from rest_framework import viewsets, permissions, response, decorators
from django.contrib.auth import get_user_model
from .models import Activity, Team, Workout, Leaderboard
from .serializers import (
	ActivitySerializer, TeamSerializer, WorkoutSerializer, LeaderboardSerializer, UserSerializer
)

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TeamViewSet(viewsets.ModelViewSet):
	queryset = Team.objects.all()
	serializer_class = TeamSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class WorkoutViewSet(viewsets.ModelViewSet):
	queryset = Workout.objects.all()
	serializer_class = WorkoutSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LeaderboardViewSet(viewsets.ModelViewSet):
	queryset = Leaderboard.objects.all().order_by('-total_points')
	serializer_class = LeaderboardSerializer
	permission_classes = [permissions.AllowAny]

class ActivityViewSet(viewsets.ModelViewSet):
	queryset = Activity.objects.all().order_by('-timestamp')
	serializer_class = ActivitySerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		qs = super().get_queryset()
		user = self.request.query_params.get('user')
		if user:
			return qs.filter(user__id=user)
		return qs

@decorators.api_view(['GET'])
def api_root(request, format=None):
	return response.Response({
		'users': request.build_absolute_uri('/api/users/'),
		'teams': request.build_absolute_uri('/api/teams/'),
		'activities': request.build_absolute_uri('/api/activities/'),
		'workouts': request.build_absolute_uri('/api/workouts/'),
		'leaderboard': request.build_absolute_uri('/api/leaderboard/'),
	})
