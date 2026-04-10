import { RegisterData } from './types'; 

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при регистрации');
    }

    return await response.json();
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};