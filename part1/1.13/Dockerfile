# Build frontend
FROM node:alpine as build
WORKDIR /app
COPY ./project-frontend/package* ./
RUN npm ci
COPY ./project-frontend/ ./
RUN npm run build

# Serve frontend static from backend
FROM node:alpine
WORKDIR /usr/src/app
COPY --from=build /app/build /usr/src/app/build
COPY ./project-backend/package* ./
RUN npm ci
COPY ./project-backend/ .
CMD ["npm", "start"]