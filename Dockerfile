# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Exponer el puerto 5173
EXPOSE 5173

# Definir el comando por defecto para ejecutar cuando se inicie el contenedor
CMD ["serve", "-s", "dist", "-l", "5173"]