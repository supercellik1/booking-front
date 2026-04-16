import type { AuthResponse, User } from './types';

const BASE_URL = 'http://localhost:5172/api/auth';

export const authService = {
    async login(email: string, passwordHash: string): Promise<AuthResponse> {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordHash }),
        });

        if (!response.ok) throw new Error('Ошибка при входе');
        return response.json();
    },

    async register(email: string, passwordHash: string, fullName: string): Promise<void> {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordHash, fullName }),
        });

        if (!response.ok) throw new Error('Ошибка при регистрации');
    },

    getCurrentUser: async (token: string): Promise<User> => {
        const response = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return response.json();
   }
};
