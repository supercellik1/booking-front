import type { Hotel } from './types';

// Разделяем базовый API и путь к отелям
const API_ROOT = 'http://localhost:5172/api';
const HOTELS_URL = `${API_ROOT}/HotelData`;
const REVIEWS_URL = `${API_ROOT}/Reviews`; // Соответствует [Route("api/[controller]")]

export const hotelService = {
  async getHotelsByCountry(country: string): Promise<Hotel[]> {
    const response = await fetch(`${HOTELS_URL}?country=${country}`);
    if (!response.ok) throw new Error('Ошибка при загрузке отелей');
    return response.json();
  },

  async getHotelById(id: string): Promise<Hotel> {
    const response = await fetch(`${HOTELS_URL}/${id}`);
    if (!response.ok) throw new Error('Отель не найден');
    return response.json();
  },

  async bookHotel(data: any, token: string): Promise<void> {
    const response = await fetch(`${HOTELS_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Ошибка при бронировании');
    }
  },

  async getUserBookings(token: string): Promise<any[]> {
    const response = await fetch(`${HOTELS_URL}/bookings/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Не удалось загрузить бронирования');
    return response.json();
  },

  // ИСПРАВЛЕННЫЕ МЕТОДЫ ДЛЯ ОТЗЫВОВ
  async getHotelReviews(hotelId: string) {
    // Теперь запрос пойдет на /api/Reviews/hotel/{id}
    const response = await fetch(`${REVIEWS_URL}/hotel/${hotelId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Ошибка при получении отзывов');
    return response.json();
  },

  async postReview(token: string, review: { hotelId: number; rating: number; comment: string }) {
    // Теперь запрос пойдет на /api/Reviews
    const response = await fetch(`${REVIEWS_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) throw new Error('Ошибка при отправке отзыва');
    return response.ok;
  }
};
