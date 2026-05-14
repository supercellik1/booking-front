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

        if (!response.ok) {
            throw new Error('Ошибка загрузки отзывов');
        }

        return response.json();
    },

    async getHotelReviews(hotelId: string): Promise<any[]> {
        const response = await fetch(`${BASE_URL}/hotel/${hotelId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        return response.json();
    },

    async postReview(
        token: string,
        review: { hotelId: number; rating: number; comment: string }
    ) {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok) {
            throw new Error('Failed to post review');
        }

        return response.json();
    }
};
