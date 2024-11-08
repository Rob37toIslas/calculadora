# Usar la imagen base de Node.js 20 con Alpine
FROM node:20-alpine

# Copiar los archivos del package.json y package-lock.json primero para optimizar la instalación de dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Asegurarse de que los binarios tengan permisos de ejecución
RUN chmod -R 755 node_modules/.bin

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación (por defecto 5173 para Vue.js)
EXPOSE 5173

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]