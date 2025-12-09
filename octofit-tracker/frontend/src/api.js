export async function createTeam(token, name, description) {
  const res = await fetch(`${API_BASE}/api/teams/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });
  return res.json();
}

export async function getTeamDetails(token, teamId) {
  const res = await fetch(`${API_BASE}/api/teams/${teamId}/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}

export async function createWorkout(token, name, description, duration_minutes, difficulty) {
  const res = await fetch(`${API_BASE}/api/workouts/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, duration_minutes, difficulty })
  });
  return res.json();
}

export async function getUserProfile(token) {
  const res = await fetch(`${API_BASE}/api/users/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}
// Simple API service for Octofit Tracker
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/auth/registration/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password1: password, password2: password })
  });
  return res.json();
}

export async function getLeaderboard(token) {
  const res = await fetch(`${API_BASE}/api/leaderboard/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}

export async function getActivities(token) {
  const res = await fetch(`${API_BASE}/api/activities/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}

export async function logActivity(token, activity) {
  const res = await fetch(`${API_BASE}/api/activities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(activity)
  });
  return res.json();
}



export async function getTeams(token) {
  const res = await fetch(`${API_BASE}/api/teams/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}

export async function getWorkouts(token) {
  const res = await fetch(`${API_BASE}/api/workouts/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  return res.json();
}

export async function joinTeam(token, teamId) {
  // PATCH user to set team (assuming backend supports it)
  const res = await fetch(`${API_BASE}/api/users/${teamId}/join/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ team: teamId })
  });
  return res.json();
}
