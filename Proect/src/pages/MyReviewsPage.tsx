import React, { useEffect, useState } from 'react';
import Header from '../components/HomePageComponents/Header/Header';
import { reviewService } from '../api/reviews/reviewService';
import type { Review } from '../api/reviews/types';
import { useAuth } from '../context/AuthContext';

const MyReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            reviewService.getUserReviews(token)
                .then(setReviews)
                .catch(console.error);
        }
    }, [token]);

    return (
        <div className="my-reviews-page">
            <Header />
            <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginTop: '80px' }}>Мои отзывы</h1>
                {reviews.length === 0 ? <p>Вы еще не оставляли отзывов.</p> : (
                    <div className="reviews-list">
                        {reviews.map(review => (
                            <div key={review.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                                <h3>{review.hotelName}</h3>
                                <div>Оценка: {review.rating}/5</div>
                                <p>{review.comment}</p>
                                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyReviewsPage;
