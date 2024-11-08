# Usar la imagen de Node.js con Alpine
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del directorio local al contenedor
COPY . .

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto en el que se ejecutará la aplicación (por defecto 5173 para Vue.js)
EXPOSE 5173

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]