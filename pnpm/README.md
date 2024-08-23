# Quick reference

- **Maintained by:**

  [Breno Salles](https://brenosalles.com)

- **Where to get help:**

  [GitHub Discussions](https://github.com/Guergeiro/docker-images/discussions)

# Supported tags and respective `Dockerfile` links

- [`12-5`, `14-5`](./Dockerfile)

- [`12-6`, `14-6`, `16-6`, `18-6`](./Dockerfile)

- [`14-7`, `16-7`, `18-7`, `20-7`](./Dockerfile)

- [`16-8`, `18-8`, `20-8`, `22-8`](./Dockerfile)

- [`18-9`, `20-9`, `22-9`](./Dockerfile)

- [`lts-9`, `latest-9`, `current-9`](./Dockerfile)

# Quick reference (cont.)

- **Where to file issues:**

  [https://github.com/Guergeiro/docker-images/issues](https://github.com/Guergeiro/docker-images/issues)

- **Supported architectures:**

  Based on [Node's base image](https://hub.docker.com/_/node).

# How to use this image

### Create a `Dockerfile` in your Node.js app project

```dockerfile
# specify the base image with your desired version
FROM guergeiro/pnpm:18-8
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

Support is given based on
[Node's release schedule](https://github.com/nodejs/release#release-schedule)
and the compatibility list of
[pnpm](https://pnpm.io/installation#compatibility).

**IMPORTANT:**

Special versions of node - `lts`, `latest`, `current` - will only target the
last version of pnpm.
