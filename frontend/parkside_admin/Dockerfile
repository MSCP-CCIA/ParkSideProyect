FROM node:18.18

WORKDIR /app
# 1) Copia solo package.json y lock
COPY package.json package-lock.json* ./

# 2) Instala todas las deps, incluyendo expo definido en package.json
RUN npm ci
RUN npm install
RUN npm install expo
# 4) Instala las dependencias que Expo web requiere
RUN npx expo install react-dom react-native-web @expo/metro-runtime
RUN npx expo install typescript @types/react
RUN npm install @react-native-async-storage/async-storage
RUN npm install expo-router
RUN npm install expo-splash-screen




COPY frontend/parkside_admin /app


EXPOSE 8082

# Usa el CLI moderno que viene con el paquete expo
CMD ["npx", "expo", "start", "--web"]