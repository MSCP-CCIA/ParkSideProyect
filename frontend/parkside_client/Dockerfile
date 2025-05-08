FROM node:18.18
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install
RUN npm install expo
# 4) Instala las dependencias que Expo web requiere
RUN npx expo install react-dom react-native-web @expo/metro-runtime
RUN npx expo install typescript @types/react
RUN npm install @react-native-async-storage/async-storage


COPY frontend/parkside_client /app

 
EXPOSE 8081
 
# Usa el CLI moderno que viene con el paquete expo
CMD ["npx", "expo", "start", "--web", "--port", "8081", "--non-interactive"]