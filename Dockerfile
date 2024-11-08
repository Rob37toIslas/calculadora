# Usar la imagen base de Node.js 20 con Alpine
FROM node:20-alpine

# Instalar una versión específica de Node.js si no es la correcta
RUN npm install -g n && n 20.15.0

# Establecer el directorio de trabajo
WORKDIR /home/app

# Copiar todos los archivos del directorio local al contenedor
COPY . .

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto en el que se ejecutará la aplicación (por defecto 5173 para Vue.js)
EXPOSE 5173

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]