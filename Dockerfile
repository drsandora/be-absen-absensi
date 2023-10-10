FROM node

WORKDIR /app/absensiS

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]