FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias del server
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias sin ejecutar scripts de husky
RUN pnpm install --ignore-scripts

# Copiar el código del server
COPY . .

EXPOSE 3000

# Usar el script dev (nodemon) para hot reload
CMD ["pnpm", "dev"]
