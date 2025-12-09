
from django.contrib import admin
from .models import Activity, Team, Workout, Leaderboard

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
	list_display = ('user', 'team', 'activity_type', 'duration_minutes', 'distance_km', 'workout', 'timestamp')
	list_filter = ('activity_type', 'timestamp', 'team')
	search_fields = ('user',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
	list_display = ('name', 'description')
	search_fields = ('name',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
	list_display = ('name', 'duration_minutes', 'difficulty')
	search_fields = ('name',)

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
	list_display = ('team', 'total_points', 'last_updated')
	list_filter = ('last_updated',)
