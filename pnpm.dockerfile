ARG version=latest
FROM node:$version

RUN npm install -g pnpm

RUN pnpm config set store-dir /var/pnpm/.pnpm-store

CMD ["pnpm"]
