# ==========================================
# Stage 1 - Build
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Remove development dependencies
RUN npm prune --omit=dev


# ==========================================
# Stage 2 - Production
# ==========================================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

# Security: run as non-root user
USER node

EXPOSE 5000

CMD ["sh","-c","npx prisma migrate deploy && node src/server.js"]