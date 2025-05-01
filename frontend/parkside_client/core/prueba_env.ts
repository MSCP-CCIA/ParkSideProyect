import { config } from 'dotenv';

// Luego, llamas a la función config para cargar las variables de entorno
config(); // Carga las variables de entorno del archivo .env al process.env
console.log('ajajajajajajaj')
const backendBaseUrl: string | undefined = process.env.BACKEND_BASE_URL;
console.log(backendBaseUrl)
if (backendBaseUrl) {
  console.log('La URL base del backend es:', backendBaseUrl);
  // Puedes usar backendBaseUrl para construir tus URLs de API
  const usersEndpoint = `${backendBaseUrl}/users`;
  console.log('Endpoint de usuarios:', usersEndpoint);
} else {
  console.error('La variable de entorno BACKEND_BASE_URL no está definida en .env');
}