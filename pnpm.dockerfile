ARG version=latest
FROM node:$version

RUN npm install -g pnpm

RUN pnpm config set store-dir /usr/pnpm/.pnpm-store

CMD ["pnpm"]
