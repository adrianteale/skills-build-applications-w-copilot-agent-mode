
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Activity, Team, Workout, Leaderboard

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    class Meta:
        model = Leaderboard
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    team = TeamSerializer(read_only=True)
    workout = WorkoutSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ('timestamp',)
