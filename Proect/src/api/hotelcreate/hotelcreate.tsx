import type { Hotel } from "./types"; 

export const hotelService = {
  async createHotel(dto: Hotel, token: string): Promise<number> {
    const res = await fetch("http://localhost:5172/api/HotelData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(dto)
    });
    if (!res.ok) {
      let msg = "Ошибка при создании отеля";
      try {
        const data = await res.json();
        msg = data?.message || msg;
      } catch {}
      throw new Error(msg);
    }
    const data = await res.json();
    return data.id;
  }
};