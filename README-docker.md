# Dockerizing a Monorepo

An step by step of how to create a docker image and build a docker container based on a monorepo

### Based on:

- https://pnpm.io/docker
- https://pnpm.io/cli/deploy

### Assumptions:

- You have followed the README to create a Monorepo with Pnpm Packages

### Creating Files:

```sh {"id":"01J9TM7NGKT3AVRCQ7GZN94BDT"}
tee .dockerignore<<EOF
node_modules
.git
.gitignore
*.md
dist
EOF
```

### Create Backend Docker Image

```sh {"cwd":"","id":"01J9TM9Z6PRKPJPGR1C3FJFDGD"}
tee Dockerfile<<EOF
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="/home/alexander/.local/share/pnpm:/home/alexander/.vscode-server/bin/e10f2369d0d9614a452462f2e01cdc4aa9486296/bin/remote-cli:/home/alexander/.local/share/pnpm:/home/alexander/google-cloud-sdk/bin:/home/alexander/.nvm/versions/node/v20.17.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files/Common Files/Oracle/Java/javapath_:/mnt/c/WINDOWS/system32:/mnt/c/WINDOWS:/mnt/c/WINDOWS/System32/Wbem:/mnt/c/WINDOWS/System32/WindowsPowerShell/v1.0/:/mnt/c/WINDOWS/System32/OpenSSH/:/mnt/c/Program Files/Java/jdk-18.0.2.1/bin:/mnt/c/sonarqube/sonar-scanner/bin:/mnt/c/Program Files/Git/cmd:/mnt/c/Program Files/HP/HP One Agent:/mnt/c/Users/Alexander-Bolanos/AppData/Local/Programs/Python/Python310/Scripts/:/mnt/c/Users/Alexander-Bolanos/AppData/Local/Programs/Python/Python310/:/mnt/c/Users/Alexander-Bolanos/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/Alexander-Bolanos/AppData/Local/Programs/Microsoft VS Code/bin:/mnt/c/Users/Alexander-Bolanos/AppData/Local/Google/Cloud SDK/google-cloud-sdk/bin:/mnt/c/Program Files/JetBrains/IntelliJ IDEA Community Edition 2022.2.1/bin:/snap/bin"
RUN corepack enable
RUN corepack install -g pnpm@9.11.0
RUN corepack use pnpm@9.11.0

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=backend --prod /prod/backend
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM base AS backend
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
EXPOSE 3000
CMD [ "pnpm", "start:prod" ]

FROM base AS frontend
COPY --from=build /prod/frontend /prod/frontend
COPY --from=build --chown=nextjs:nodejs /usr/src/app/projects/frontend/.next ./prod/frontend/.next
WORKDIR /prod/frontend
EXPOSE 8080
CMD [ "pnpm", "start" ]
EOF
```

### Creating the Images:

```sh {"cwd":"","id":"01J9TMH1FQWYQ2DX125FJNKFJ3"}
docker build . --target backend --tag backend:latest
```

```sh {"id":"01J9TMQAGRGKCMFTVP8A98CXJ7"}
docker build . --target frontend --tag frontend:latest
```

#### Mounting the Images:

```sh {"id":"01J9TN0C6TGKXGKPJE8JC81YYE"}
docker run -d -it --rm -p 3000:3000 --name backend backend:latest
```

```sh {"id":"01J9TQ2TNH82A0P5JFPQ5TRYSS"}
docker run -d -it --rm -p 8080:8080 --name frontend frontend:latest
```