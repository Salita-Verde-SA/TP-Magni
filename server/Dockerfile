FROM node:20-alpine

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Copiamos el resto del código
COPY . .

# El puerto que definimos en index.js (3000 por defecto)
EXPOSE 3000

# Arrancamos la aplicación
CMD ["node", "index.js"]
