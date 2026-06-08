# ================================================================
# TableMaster — Multi-Stage Dockerfile
# Stage 1 : Build  → Node 20 Alpine (compiles React/TS/Tailwind)
# Stage 2 : Serve  → Nginx Alpine   (serves static dist, ~25 MB)
# ================================================================

# ───────────────────────────────────────────────
# STAGE 1 — BUILD
# ───────────────────────────────────────────────
FROM node:20-alpine AS builder

# Metadata
LABEL stage="builder"
LABEL app="table-learning-app"

# Set working directory inside container
WORKDIR /app

# --- Install dependencies first (layer-cache friendly) ---
# Copy only package files so this layer is rebuilt only when
# dependencies actually change, not on every source file edit.
COPY package.json package-lock.json ./

# Clean install — uses lock file for reproducible builds
RUN npm ci --prefer-offline

# --- Copy source & build ---
# Copy everything else (src, index.html, config files, etc.)
COPY . .

# Run TypeScript check + Vite production build
# Output lands in /app/dist
RUN npm run build

# ───────────────────────────────────────────────
# STAGE 2 — SERVE
# ───────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Metadata
LABEL maintainer="TableMaster Team"
LABEL app="table-learning-app"
LABEL description="Multiplication Table Learning App — React + Vite + Nginx"

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (handles SPA client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx runs on port 80 inside the container.
# Map to any host port with:  docker run -p 3000:80 ...
EXPOSE 80

# Health-check: lightweight curl ping every 30s
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

# Start Nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
