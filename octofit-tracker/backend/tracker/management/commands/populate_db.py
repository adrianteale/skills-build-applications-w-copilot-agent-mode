from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from tracker.models import Team, Workout, Activity, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        self.stdout.write('Deleting old data...')
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        self.stdout.write('Creating users...')
        heroes = [
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': marvel},
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'team': dc},
        ]
        user_objs = []
        for hero in heroes:
            user = User.objects.create(username=hero['username'], email=hero['email'])
            user_objs.append((user, hero['team']))

        self.stdout.write('Creating workouts...')
        workout1 = Workout.objects.create(name='Pushups', description='Upper body strength', duration_minutes=10, difficulty='Easy')
        workout2 = Workout.objects.create(name='Running', description='Cardio', duration_minutes=30, difficulty='Medium')

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=user_objs[0][0], team=marvel, activity_type='Running', duration_minutes=30, distance_km=5.0, workout=workout2)
        Activity.objects.create(user=user_objs[1][0], team=marvel, activity_type='Pushups', duration_minutes=10, distance_km=None, workout=workout1)
        Activity.objects.create(user=user_objs[2][0], team=dc, activity_type='Running', duration_minutes=25, distance_km=4.0, workout=workout2)
        Activity.objects.create(user=user_objs[3][0], team=dc, activity_type='Pushups', duration_minutes=12, distance_km=None, workout=workout1)

        self.stdout.write('Creating leaderboard...')
        Leaderboard.objects.create(team=marvel, total_points=100)
        Leaderboard.objects.create(team=dc, total_points=90)

        self.stdout.write(self.style.SUCCESS('Database populated with superhero test data!'))
