# WARNING

Since pnpm version 11, the pnpm team now provides official Docker images. This
repository is only maintained for legacy purposes and will not receive updates.
Please refer to the official pnpm Docker images for the latest versions and
support.

Link: https://pnpm.io/docker

# Quick reference

- **Maintained by:**

  [Breno Salles](https://brenosalles.com)

- **Where to get help:**

  [GitHub Discussions](https://github.com/Guergeiro/docker-images/discussions)

# Supported node tags

- 22
- 24
- 26

# Supported pnpm tags

- 7
- 8
- 9
- 10

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
