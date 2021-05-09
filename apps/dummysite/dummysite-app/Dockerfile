FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV SITE_URL=http://example.com
CMD ["node", "index.js"]