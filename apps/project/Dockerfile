# Serving frontend static from backend for GKE exercises for simplicity

# Build frontend
FROM node:alpine as frontbuild
WORKDIR /app
COPY ./project-frontend/package* ./
RUN npm ci
COPY ./project-frontend/ ./
RUN npm run build

# Run backend
FROM node:alpine
WORKDIR /app
COPY --from=frontbuild /app/build /app/build
COPY ./project-backend/package* ./
RUN npm ci
COPY ./project-backend/ ./
ENV GKE=true
CMD ["npm", "start"]