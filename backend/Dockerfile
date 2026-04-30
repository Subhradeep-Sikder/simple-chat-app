# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built code and TypeScript files from builder
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin
COPY --from=builder /app/node_modules/@types ./node_modules/@types
COPY --from=builder /app/node_modules/tsx ./node_modules/tsx
COPY --from=builder /app/node_modules/typescript ./node_modules/typescript

# Copy source TypeScript files
COPY . .

# Expose WebSocket port
EXPOSE 8080

# Start with tsx (runtime TypeScript execution)
CMD ["npm", "start"]
