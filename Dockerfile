FROM node:14.17.3-buster
RUN apt update
RUN ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
RUN apt install yarn -y
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
ENV SERVER="http://localhost:3000/"
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["yarn","start"]
