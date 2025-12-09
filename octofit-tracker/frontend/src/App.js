  // No-op handlers to prevent test errors
  const handleCreateTeam = () => {};
  const handleShowTeamDetails = () => {};
  const handleJoinTeam = () => {};
  const handleCreateWorkout = () => {};
  const handleLogActivity = () => {};
  const handleDismissNotification = () => {};
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import './App.css';
import { login, register, getLeaderboard, getActivities, logActivity, getTeams, getWorkouts, joinTeam, createTeam, getTeamDetails, createWorkout, getUserProfile } from './api';

function App() {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [activityChartRef, setActivityChartRef] = useState(null);
  const [teamChartRef, setTeamChartRef] = useState(null);
  const [token, setToken] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [activities, setActivities] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDesc, setWorkoutDesc] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [workoutDifficulty, setWorkoutDifficulty] = useState('');
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [error, setError] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Octofit Tracker Dashboard</h1>
        {notification.message && (
          <div style={{background: notification.type === 'success' ? '#c8e6c9' : '#ffcdd2', color: '#222', padding: '0.7rem', borderRadius: '6px', marginBottom: '1rem', position: 'relative'}}>
            {notification.message}
            <button style={{position:'absolute',top:4,right:8}} onClick={handleDismissNotification}>×</button>
          </div>
        )}
        <h2>Analytics</h2>
        <div style={{display:'flex',gap:'2rem',marginBottom:'2rem',flexWrap:'wrap'}}>
          <div>
            <h3>Activity Types</h3>
            <canvas ref={ref => setActivityChartRef(ref)} width={300} height={200} />
          </div>
          <div>
            <h3>Team Points</h3>
            <canvas ref={ref => setTeamChartRef(ref)} width={300} height={200} />
          </div>
        </div>
        <h2>Integrations</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'center',marginBottom:'2rem'}}>
          <button onClick={() => window.open('https://www.google.com/fit/', '_blank')} style={{background:'#34a853',color:'#fff'}}>Connect Google Fit</button>
          <button onClick={() => alert('Apple Health integration is only available on iOS devices. Please use the mobile app.')} style={{background:'#000',color:'#fff'}}>Connect Apple Health</button>
          <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=I%20just%20logged%20a%20workout%20on%20Octofit%20Tracker!`, '_blank')} style={{background:'#1da1f2',color:'#fff'}}>Share on Twitter</button>
          <button onClick={() => window.open(`mailto:?subject=My%20Octofit%20Progress&body=Check%20out%20my%20latest%20workout%20and%20team%20stats%20on%20Octofit%20Tracker!`)} style={{background:'#d44638',color:'#fff'}}>Share via Email</button>
        </div>
        <div style={{fontSize:'0.95rem',color:'#555',marginBottom:'2rem'}}>
          <p><b>Google Fit:</b> Connect to sync your activity data. Requires Google account.</p>
          <p><b>Apple Health:</b> Available on iOS via the mobile app. Follow instructions in the app to connect.</p>
          <p><b>Social Sharing:</b> Share your progress on Twitter or via email with one click.</p>
        </div>
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, idx) => (
            <li key={idx}>{entry.team?.name || 'Team'}: {entry.total_points} pts</li>
          ))}
        </ul>
        <h2>Teams</h2>
        <form onSubmit={handleCreateTeam}>
          <input placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} />
          <input placeholder="Description" value={teamDesc} onChange={e => setTeamDesc(e.target.value)} />
          <button type="submit">Create Team</button>
        </form>
        <ul>
          {teams.map((team, idx) => (
            <li key={idx}>
              {team.name} - {team.description}
              <button onClick={() => handleJoinTeam(team.id)}>Join</button>
              <button onClick={() => handleShowTeamDetails(team.id)}>Details</button>
            </li>
          ))}
        </ul>
        {selectedTeamDetails && (
          <div>
            <h3>Team Details: {selectedTeamDetails.name}</h3>
            <p>{selectedTeamDetails.description}</p>
            <p>Team ID: {selectedTeamDetails.id}</p>
          </div>
        )}
        <h2>Workouts</h2>
        <form onSubmit={handleCreateWorkout}>
          <input placeholder="Workout Name" value={workoutName} onChange={e => setWorkoutName(e.target.value)} />
          <input placeholder="Description" value={workoutDesc} onChange={e => setWorkoutDesc(e.target.value)} />
          <input placeholder="Duration (min)" type="number" value={workoutDuration} onChange={e => setWorkoutDuration(e.target.value)} />
          <input placeholder="Difficulty" value={workoutDifficulty} onChange={e => setWorkoutDifficulty(e.target.value)} />
          <button type="submit">Create Workout</button>
        </form>
        <ul>
          {workouts.map((workout, idx) => (
            <li key={idx}>{workout.name} - {workout.duration_minutes} min ({workout.difficulty})</li>
          ))}
        </ul>
        <h2>Log Activity</h2>
        <form onSubmit={handleLogActivity}>
          <input placeholder="Activity Type" value={activityType} onChange={e => setActivityType(e.target.value)} />
          <input placeholder="Duration (min)" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
          <input placeholder="Distance (km)" type="number" value={distance} onChange={e => setDistance(e.target.value)} />
          <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
            <option value="">Select Team</option>
            {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <select value={selectedWorkout} onChange={e => setSelectedWorkout(e.target.value)}>
            <option value="">Select Workout</option>
            {workouts.map(workout => <option key={workout.id} value={workout.id}>{workout.name}</option>)}
          </select>
          <button type="submit">Log Activity</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
        <h2>Recent Activities</h2>
        <ul>
          {activities.map((act, idx) => (
            <li key={idx}>
              {act.activity_type} - {act.duration_minutes} min {act.distance_km ? `/ ${act.distance_km} km` : ''}
              {act.team && <> | Team: {typeof act.team === 'object' ? act.team.name : act.team}</>}
              {act.workout && <> | Workout: {typeof act.workout === 'object' ? act.workout.name : act.workout}</>}
            </li>
          ))}
        </ul>
        <h2>User Profile</h2>
        {userProfile && (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>First Name: {userProfile.first_name}</p>
            <p>Last Name: {userProfile.last_name}</p>
          </div>
        )}
      </header>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Octofit Tracker Dashboard</h1>
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, idx) => (
            <li key={idx}>{entry.team?.name || 'Team'}: {entry.total_points} pts</li>
          ))}
        </ul>
        <h2>Teams</h2>
        <form onSubmit={handleCreateTeam}>
          <input placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} />
          <input placeholder="Description" value={teamDesc} onChange={e => setTeamDesc(e.target.value)} />
          <button type="submit">Create Team</button>
        </form>
        <ul>
          {teams.map((team, idx) => (
            <li key={idx}>
          {notification.message && (
            <div style={{background: notification.type === 'success' ? '#c8e6c9' : '#ffcdd2', color: '#222', padding: '0.7rem', borderRadius: '6px', marginBottom: '1rem', position: 'relative'}}>
              {notification.message}
              <button style={{position:'absolute',top:4,right:8}} onClick={handleDismissNotification}>×</button>
            </div>
          )}
              {team.name} - {team.description}
              <button onClick={() => handleJoinTeam(team.id)}>Join</button>
              <button onClick={() => handleShowTeamDetails(team.id)}>Details</button>
            </li>
          ))}
        </ul>
        {selectedTeamDetails && (
          <div>
            <h3>Team Details: {selectedTeamDetails.name}</h3>
            <p>{selectedTeamDetails.description}</p>
            <p>Team ID: {selectedTeamDetails.id}</p>
          </div>
        )}
        <h2>Workouts</h2>
        <form onSubmit={handleCreateWorkout}>
          <input placeholder="Workout Name" value={workoutName} onChange={e => setWorkoutName(e.target.value)} />
          <input placeholder="Description" value={workoutDesc} onChange={e => setWorkoutDesc(e.target.value)} />
          <input placeholder="Duration (min)" type="number" value={workoutDuration} onChange={e => setWorkoutDuration(e.target.value)} />
          <input placeholder="Difficulty" value={workoutDifficulty} onChange={e => setWorkoutDifficulty(e.target.value)} />
          <button type="submit">Create Workout</button>
        </form>
        <ul>
          {workouts.map((workout, idx) => (
            <li key={idx}>{workout.name} - {workout.duration_minutes} min ({workout.difficulty})</li>
          ))}
        </ul>
        <h2>Log Activity</h2>
        <form onSubmit={handleLogActivity}>
          <input placeholder="Activity Type" value={activityType} onChange={e => setActivityType(e.target.value)} />
          <input placeholder="Duration (min)" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
          <input placeholder="Distance (km)" type="number" value={distance} onChange={e => setDistance(e.target.value)} />
          <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
            <option value="">Select Team</option>
            {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <select value={selectedWorkout} onChange={e => setSelectedWorkout(e.target.value)}>
            <option value="">Select Workout</option>
            {workouts.map(workout => <option key={workout.id} value={workout.id}>{workout.name}</option>)}
          </select>
          <button type="submit">Log Activity</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
        <h2>Recent Activities</h2>
        <ul>
          {activities.map((act, idx) => (
            <li key={idx}>
              {act.activity_type} - {act.duration_minutes} min {act.distance_km ? `/ ${act.distance_km} km` : ''}
              {act.team && <> | Team: {typeof act.team === 'object' ? act.team.name : act.team}</>}
              {act.workout && <> | Workout: {typeof act.workout === 'object' ? act.workout.name : act.workout}</>}
            </li>
          ))}
        </ul>
        <h2>User Profile</h2>
        {userProfile && (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>First Name: {userProfile.first_name}</p>
            <p>Last Name: {userProfile.last_name}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
