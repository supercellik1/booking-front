export type Hotel = {
  id: number;
  name: string;
  rating: number;
  description: string;
  fullDescription: string;
  location: string;
  price: string;
  mapUrl: string;
  country: string;
  images: string[];
};

export interface BookingData {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  fullName: string;
  email: string;
  guests: number;
};
