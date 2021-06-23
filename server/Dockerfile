FROM node:15

WORKDIR /server

COPY package*.json /server/

RUN npm install\
    && npm install tsc - g

COPY . .

RUN npm run build

EXPOSE 80

CMD ["node", "dist/api/main.js"]