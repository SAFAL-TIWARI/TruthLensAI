# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Cloud Run expects the container to listen on $PORT, but Nginx is usually configured for a static port.
# We use a custom nginx config that listens on 8080 (which we'll tell Cloud Run to use) 
# or we can use a small script to replace the port in the config.
# For simplicity, we'll set nginx to 8080 in the config and tell Cloud Run to use that.

CMD ["nginx", "-g", "daemon off;"]
