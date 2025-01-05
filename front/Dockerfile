FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

COPY . .

# RUN npm run build
# RUN npm install -g serve

EXPOSE 3010

CMD [ "npm", "start" ]