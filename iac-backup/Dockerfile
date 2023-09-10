FROM denoland/deno:latest as compile
RUN apt-get update
RUN apt-get install unzip -y
WORKDIR /usr/src/app
COPY deps.ts .
RUN deno cache deps.ts

COPY ./src ./src
COPY mod.ts .

RUN deno compile \
  --allow-write \
  --allow-read \
  --allow-env \
  --allow-run \
  --target x86_64-unknown-linux-gnu \
  --output iac-backup \
  mod.ts

FROM bitnami/rclone:latest
USER root
RUN apt-get update
RUN apt-get install lsb-release -y
RUN apt-get clean all
RUN sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN apt-get install wget gnupg -y
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
RUN apt-get install p7zip-full -y
RUN apt-get install postgresql-client-15 -y
WORKDIR /usr/src/app
COPY --from=compile /usr/src/app/iac-backup .

ENTRYPOINT [ "/usr/src/app/iac-backup" ]
