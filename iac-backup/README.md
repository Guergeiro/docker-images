# Quick reference

- **Maintained by:**

  [Breno Salles](https://brenosalles.com)

- **Where to get help:**

  [GitHub Discussions](https://github.com/Guergeiro/docker-images/discussions)

# Supported tags and respective `Dockerfile` links

- [`latest`](./Dockerfile)

# Quick reference (cont.)

- **Where to file issues:**

  [https://github.com/Guergeiro/docker-images/issues](https://github.com/Guergeiro/docker-images/issues)

- **Supported architectures:**

  Based on [Deno's base image](https://hub.docker.com/r/denoland/deno) and
  [Bitnami's Rclone image](https://hub.docker.com/r/bitnami/rclone).

# How to use this image

This image serves the purpose of backing up my
[homeserver](https://github.com/Guergeiro/iac), so use it if you want.

I use it to backup the following services:

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden)

  - `Postgres` database
  - `Attachments` folder
  - `Sends` folder
  - `RSA` keys

- [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx)

  - `Postgres` database
  - `Media` folder

```console
$ docker run -it --rm --name vaultwarden-backup guergeiro/backup:latest vaultwarden
$ docker run -it --rm --name paperless-backup guergeiro/backup:latest paperless
# Or using both
$ docker run -it --rm --name backup guergeiro/backup:latest paperless vaultwarden
```
