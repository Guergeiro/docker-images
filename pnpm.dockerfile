ARG version=latest
FROM node:$version
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
CMD ["node"]
