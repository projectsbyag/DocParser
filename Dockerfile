# ==========================================
# Stage 1: Build stage
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json tsconfig.json ./

# Install all dependencies (including build tools)
RUN npm ci

# Copy application source code
COPY . .

# Compile TypeScript to production JavaScript
RUN npm run build

# ==========================================
# Stage 2: Production runtime image
# ==========================================
FROM node:22-alpine AS runner

# dumb-init ensures proper signal forwarding (SIGTERM) for Cloud Run
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# Switch to non-root user for security hardening
USER node

# Copy production dependencies only
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# Copy compiled artifacts from builder stage
COPY --from=builder --chown=node:node /app/dist ./dist

# Cloud Run uses PORT 8080 by default
EXPOSE 8080

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/server.js"]
