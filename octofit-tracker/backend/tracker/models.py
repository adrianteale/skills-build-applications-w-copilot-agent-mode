from django.db import models
from django.conf import settings



class Team(models.Model):
	name = models.CharField(max_length=100, unique=True)
	description = models.TextField(blank=True)

	def __str__(self):
		return self.name

class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(blank=True)
	duration_minutes = models.PositiveIntegerField()
	difficulty = models.CharField(max_length=50)

	def __str__(self):
		return self.name

class Leaderboard(models.Model):
	team = models.ForeignKey(Team, on_delete=models.CASCADE)
	total_points = models.PositiveIntegerField(default=0)
	last_updated = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"{self.team.name} - {self.total_points} pts"

class Activity(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)
	activity_type = models.CharField(max_length=100)
	duration_minutes = models.PositiveIntegerField()
	distance_km = models.FloatField(null=True, blank=True)
	workout = models.ForeignKey(Workout, on_delete=models.SET_NULL, null=True, blank=True)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.user} - {self.activity_type} ({self.duration_minutes}m)"
