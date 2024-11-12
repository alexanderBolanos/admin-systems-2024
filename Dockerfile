FROM node:20-slim as base

ENV PNPM_HOME = "/pnpm"
ENV PATH = "$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as prod

COPY pnpm-lock.yaml /app
WORKDIR /app
RUN pnpm fetch --prod

COPY . /app
RUN pnpm -r run build

FROM base 
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "start:prod" ]