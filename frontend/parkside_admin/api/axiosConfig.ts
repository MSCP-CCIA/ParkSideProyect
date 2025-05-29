import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const excludedRoutes = ['/api/v1/customer/login','/api/v1/customer/register'];
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
      // Si la ruta está en la lista de exclusión, no agregar token
      if (excludedRoutes.some(route => config.url?.includes(route))) {
        return config;
      }
      const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
      console.error('Error al obtener o parsear el token del storage:', error);
    }
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