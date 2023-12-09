### STAGE 1: Build ###
FROM node:18.18.0 as build
WORKDIR /app

# Set default environment to 'development'
ARG ENVIRONMENT=development
ENV APP_ENVIRONMENT=$ENVIRONMENT
RUN echo "running app in $ENVIRONMENT mode"

COPY package*.json ./
COPY .env-$ENVIRONMENT .env

RUN npm install
COPY . .
RUN npm run build
RUN npm run export

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY cert/pertaminalubricants.com.pem /etc/nginx/ssl/pertaminalubricants.com.pem
COPY cert/SSLCert2023.key /etc/nginx/ssl/SSLCert2023.key

EXPOSE 80
EXPOSE 443

COPY --from=build /app/out /usr/share/nginx/html