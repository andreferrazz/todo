# syntax=docker/dockerfile:1

# DEPENDENCIES STAGE
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# BUILD STAGE
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}
ENV NODE_ENV=production
RUN npm run build

# RUN STAGE
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["node", "build"]