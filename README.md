# Testing Next.js Application with Cypress

## Running the application

### Locally

```sh
docker run --rm -d --env DATABASE_URL=postgresql://postgres@postgresql:5433 nextjs-cypress-demo yarn prisma migrate dev
```

### With interactive shell

```sh
docker run --rm -it nextjs-cypress-demo sh
```

## Building the tarball

```sh
tar -czpf project.tar.gz Dockerfile package.json yarn.lock
```

## Building the Dockerfile

```sh
docker build -t nextjs-cypress-demo .
```
