# Development stage for Vite
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for Vite)
RUN npm ci

# Copy source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite dev server with --host to allow external connections
CMD ["npm", "run", "dev", "--", "--host"]
