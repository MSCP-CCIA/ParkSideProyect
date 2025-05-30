/**
 * Configuración de Axios con interceptores para manejo de tokens y errores.
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Rutas excluidas donde no se debe agregar el token de autorización.
 */
const excludedRoutes = ['/api/v1/customer/login', '/api/v1/customer/register'];

/**
 * Interfaz para la información de login almacenada.
 */
export interface LoginData {
  id: number;
  token: string;
}

/**
 * URL base para las peticiones HTTP.
 */
const baseURL = 'http://34.224.49.5:8000';

/**
 * Instancia configurada de Axios.
 */
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para las solicitudes que agrega el token de autorización cuando es necesario.
 */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      // No agregar token para rutas excluidas
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

/**
 * Interceptor para las respuestas que maneja errores y logueo detallado.
 */
api.interceptors.response.use(
  (response) => response,
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
