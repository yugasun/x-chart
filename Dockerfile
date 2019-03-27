FROM node:9.11.2 as builder
WORKDIR /app
COPY . /app/
RUN npm install \
    && npm run build

FROM nginx:1.14.2
COPY --from=builder /app/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
