const BASE_URL = 'http://localhost:5172/api/HotelData'; 

export const hotelService = {
  async getHotelsByCountry(country: string): Promise<Hotel[]> {
    const response = await fetch(`${BASE_URL}?country=${country}`);
    if (!response.ok) throw new Error('Ошибка при загрузке отелей');
    return response.json();
  },

  async getHotelById(id: string): Promise<Hotel> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Отель не найден');
    return response.json();
  },
    

  async bookHotel(data: any, token: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/bookings`, {
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
    const response = await fetch(`${BASE_URL}/bookings/my`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Не удалось загрузить бронирования');
    return response.json();
 }
};
