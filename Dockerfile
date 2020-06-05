FROM node:10.20.0-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install -p && npm run build
EXPOSE 3000
CMD ["npm", "start"]
