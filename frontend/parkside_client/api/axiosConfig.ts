import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos la interfaz para el objeto que guardas
export interface LoginData {
  id: number;
  token: string;
}

const baseURL = 'http://127.0.0.1:8000';

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      // 1. Obtener el string del AsyncStorage
      const storedDataString = await AsyncStorage.getItem('authToken');

      if (storedDataString) {
        // 2. Parsear el string JSON a un objeto LoginData
        const loginData: LoginData = JSON.parse(storedDataString);

        // 3. Acceder a la propiedad 'token' del objeto
        const token = loginData.token;

        if (token) {
          console.log('Token encontrado y agregado a la cabecera:', token);
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error al obtener o parsear el token del storage:', error);
      // Opcional: Si el token está corrupto o no se puede parsear, podrías limpiar el storage
      // AsyncStorage.removeItem('loginData');
    }
    console.log(config.headers)
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Error en la petición de Axios:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('Error en la respuesta de Axios:', error);
    if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;