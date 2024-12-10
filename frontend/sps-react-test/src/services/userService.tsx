const {API_BASE_URL} = require('../utils/env')

export async function fetchUsers(token: String) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to fetch users ${data.error}`);
  }

  const users = await response.json();
  return users;
}
export async function getUserById(userId: Number, token: String) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to fetch users ${data.error}`);
  }

  const users = await response.json();
  return users;
}

export async function updateUser(userId: Number, user) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to update user ${data.error}`);
  }

  return response.json();
}
export async function createUser(user) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to create user: ${data.error}`);
  }

  return response.json();
}

export async function deleteUser(userId: Number) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to delete user ${data.error}`);
  }

  return response.json();
}

