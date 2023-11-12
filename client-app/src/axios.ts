import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from './serverUrl';

// Создайте экземпляр Axios с базовыми настройками
const api = axios.create({
  baseURL: API_URL, // Замените на вашу базовую URL-адрес
});

// Добавьте перехватчик запросов
api.interceptors.request.use(
  async (config) => {
    // Получите JWT-токен из вашего хранилища (например, AsyncStorage)
    const token = await AsyncStorage.getItem('jwtToken');

    // Добавьте токен в заголовок Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;