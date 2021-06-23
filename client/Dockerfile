FROM node:15 as build

# stage 1
WORKDIR /client
COPY package*.json /client/
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM nginx:1.16.0-alpine
COPY --from=build /client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]