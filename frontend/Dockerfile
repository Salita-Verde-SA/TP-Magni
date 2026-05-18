# Etapa de construcción
FROM node:20-alpine as build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiamos los archivos estáticos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos la configuración de Nginx para manejar el routing de SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
