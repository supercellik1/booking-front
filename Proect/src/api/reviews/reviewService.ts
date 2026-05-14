import type { Review } from './types';

const BASE_URL = 'http://localhost:5172/api/reviews';

export const reviewService = {
    async getUserReviews(token: string): Promise<Review[]> {
        const response = await fetch(`${BASE_URL}/my`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Ошибка загрузки отзывов');
        return response.json();
    }
};
