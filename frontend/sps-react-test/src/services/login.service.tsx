const {API_BASE_URL} = require('../utils/env')
export async function login(email: String, password: String) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Error logging in');
    }

    const { token } = await response.json();
    return token;
}
