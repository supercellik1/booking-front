
import type { UserInfo as User } from '../users/types';

const BASE_URL = 'http://localhost:5172/api/admin/users'; 

function getToken(): string | null {
  return localStorage.getItem('token');
}

export const userService = {

  async getAll(): Promise<User[]> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка загрузки пользователей');
    return res.json();
  },

  async makeAdmin(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/make-admin`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при назначении администратора');
  },

  async removeAdmin(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/remove-admin`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при снятии администратора');
  },

  async makeManager(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/make-manager`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при назначении менеджера');
  },

  async removeManager(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/remove-manager`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при снятии менеджера');
  },

  async blockUser(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/block`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при блокировке пользователя');
  },

  async unblockUser(userId: number | string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Нет токена авторизации');
    const res = await fetch(`${BASE_URL}/${userId}/unblock`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка при разблокировке пользователя');
  }
};