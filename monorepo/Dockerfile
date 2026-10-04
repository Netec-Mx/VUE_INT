# Etapa 1: Build de la aplicacion
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
COPY apps/ ./apps/

WORKDIR /app/apps/web
RUN pnpm install && pnpm run build

# Etapa 2: Servidor web ultraliviano Nginx
FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
