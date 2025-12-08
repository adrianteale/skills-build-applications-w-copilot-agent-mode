from django.db import models


class Activity(models.Model):
	user = models.CharField(max_length=150)
	activity_type = models.CharField(max_length=100)
	duration_minutes = models.PositiveIntegerField()
	distance_km = models.FloatField(null=True, blank=True)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.user} - {self.activity_type} ({self.duration_minutes}m)"
