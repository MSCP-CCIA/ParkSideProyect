import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('adminToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        // Cualquier código de estado que se encuentre dentro del rango de 2xx causa que esta función se active
        // Simplemente devuelve la respuesta si es exitosa
        return response;
    },
    async (error) => {
        // Cualquier código de estado que caiga fuera del rango de 2xx causa que esta función se active
        const originalRequest = error.config;

        if (error.response) {
            const { status } = error.response;

            // Ejemplo: Manejo de error 401 Unauthorized
            if (status === 401) {
                // Aquí puedes implementar lógica para:
                // 1. Intentar refrescar el token (si tu backend lo soporta)
                //    - Si el refresco es exitoso, reintentar la solicitud original.
                //    - Si falla, desloguear al usuario.
                // 2. O simplemente desloguear al usuario y redirigirlo al login.

                console.error("Error 401: No autorizado. Deslogueando...");
                await AsyncStorage.removeItem('adminToken');
                await AsyncStorage.removeItem('adminUser');

                // Aquí deberías navegar al Login.
                // Esto depende de cómo manejes la navegación global.
                // Podrías usar un evento, o si este módulo tiene acceso al contexto de navegación.
                // Ejemplo: router.replace('/Login'); (si usas expo-router y tienes acceso al router)
                // Por ahora, solo un log y se rechaza la promesa:
                alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                // Idealmente, aquí se redirige a la pantalla de login.
                // window.location.href = '/Login'; // Para web, si Expo Router no está disponible aquí directamente
            } else if (status === 403) {
                console.error("Error 403: Acceso prohibido.");
                alert('No tienes permisos para realizar esta acción.');
            } else if (status >= 500) {
                // Errores del servidor
                console.error("Error del servidor:", error.response.data);
                alert('Ocurrió un error en el servidor. Inténtalo más tarde.');
            }
        } else if (error.request) {
            console.error("Error de red:", error.message);
            alert('No se pudo conectar al servidor. Verifica tu conexión a internet.');
        } else {
            console.error("Error de configuración de la solicitud:", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;