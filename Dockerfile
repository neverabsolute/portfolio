# initialize the base image
FROM node:20-alpine

# install the package manager
RUN npm install -g pnpm@9.5.0

# set the directory and copy the 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# install the dependencies
RUN pnpm install --frozen-lockfile

# copy the project files into the docker image
COPY . .
RUN npx svelte-kit sync

RUN pnpm build

EXPOSE 5173
# start the application
CMD ["node", "build"]