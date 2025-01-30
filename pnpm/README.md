# Quick reference

- **Maintained by:**

  [Breno Salles](https://brenosalles.com)

- **Where to get help:**

  [GitHub Discussions](https://github.com/Guergeiro/docker-images/discussions)

# Supported tags and respective `Dockerfile` links

- [`18-6`, `18-7`, `18-8`, `18-9`, `18-10`](./Dockerfile)

- [`20-7`, `20-8`, `20-9`, `20-10`](./Dockerfile)

- [`22-8`, `22-9`, `22-10`, `lts-latest`](./Dockerfile)

- [`latest-latest`, `current-latest`](./Dockerfile)

- [`18-6-alpine`, `18-7-alpine`, `18-8-alpine`, `18-9-alpine`, `18-10-alpine`](./Dockerfile_alpine)

- [`20-7-alpine`, `20-8-alpine`, `20-9-alpine`, `20-10-alpine`](./Dockerfile_alpine)

- [`22-8-alpine`, `22-9-alpine`, `22-10-alpine`, `lts-latest-alpine`](./Dockerfile_alpine)

- [`current-latest-alpine`](./Dockerfile_alpine)

- [`18-6-slim`, `18-7-slim`, `18-8-slim`, `18-9-slim`, `18-10-slim`](./Dockerfile_slim)

- [`20-7-slim`, `20-8-slim`, `20-9-slim`, `20-10-slim`](./Dockerfile_slim)

- [`22-8-slim`, `22-9-slim`, `22-10-slim`, `lts-latest-slim`](./Dockerfile_slim)
- [`current-latest-slim`](./Dockerfile_slim)

# Quick reference (cont.)

- **Where to file issues:**

  [https://github.com/Guergeiro/docker-images/issues](https://github.com/Guergeiro/docker-images/issues)

- **Supported architectures:**

  Based on [Node's base image](https://hub.docker.com/_/node).

# How to use this image

### Create a `Dockerfile` in your Node.js app project

```dockerfile
# specify the base image with your desired version
FROM guergeiro/pnpm:22-10
COPY . .
RUN pnpm install
CMD ["pnpm", "start"]
```

You can then build and run the Docker image:

```console
$ docker build -t my-nodejs-app .
$ docker run -it --rm --name my-running-app my-nodejs-app
```

# Image Variants

## `guergeiro/pnpm:<node-version>-<pnpm-version>`

This is the defacto image.

## `guergeiro/pnpm:<node-version>-<pnpm-version>-alpine`

This image is based on the popular
[Alpine Linux project](https://alpinelinux.org/), available in
[the alpine official image](https://hub.docker.com/_/alpine).

## `guergeiro/pnpm:<node-version>-<pnpm-version>-slim`

This image does not contain the common packages contained in the default tag and
only contains the minimal packages needed to run `node`.

Support is given based on
[Node's release schedule](https://github.com/nodejs/release#release-schedule)
and the compatibility list of
[pnpm](https://pnpm.io/installation#compatibility).

**IMPORTANT:**

Special versions of node - `lts`, `latest`, `current` - will only target the
last version of pnpm.
