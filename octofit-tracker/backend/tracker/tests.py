

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Team, Workout, Activity, Leaderboard

User = get_user_model()

class APISmokeTests(TestCase):
	def setUp(self):
		self.client = APIClient()
		self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
		self.client.force_authenticate(user=self.user)
		self.team = Team.objects.create(name='Marvel', description='Superhero team')
		self.workout = Workout.objects.create(name='Pushups', description='Upper body', duration_minutes=10, difficulty='Easy')
		self.activity = Activity.objects.create(user=self.user, team=self.team, activity_type='Running', duration_minutes=30, distance_km=5.0, workout=self.workout)
		self.leaderboard = Leaderboard.objects.create(team=self.team, total_points=100)

	def test_api_root(self):
		response = self.client.get(reverse('api-root'))
		self.assertEqual(response.status_code, 200)
		self.assertIn('users', response.data)

	def test_users_endpoint(self):
		response = self.client.get('/api/users/')
		self.assertEqual(response.status_code, 200)
		self.assertGreaterEqual(len(response.data), 1)

	def test_teams_endpoint(self):
		response = self.client.get('/api/teams/')
		self.assertEqual(response.status_code, 200)
		self.assertGreaterEqual(len(response.data), 1)

	def test_workouts_endpoint(self):
		response = self.client.get('/api/workouts/')
		self.assertEqual(response.status_code, 200)
		self.assertGreaterEqual(len(response.data), 1)

	def test_activities_endpoint(self):
		response = self.client.get('/api/activities/')
		self.assertEqual(response.status_code, 200)
		self.assertGreaterEqual(len(response.data), 1)

	def test_leaderboard_endpoint(self):
		response = self.client.get('/api/leaderboard/')
		self.assertEqual(response.status_code, 200)
		self.assertGreaterEqual(len(response.data), 1)
