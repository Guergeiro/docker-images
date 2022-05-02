ARG version=latest
FROM node:$version
RUN npm install --global pnpm@6
CMD ["node"]
