ARG node=latest
ARG pnpm=latest
FROM node:$node
RUN npm install --global "pnpm@$pnpm"
CMD ["node"]
