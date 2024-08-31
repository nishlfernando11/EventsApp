# Fetching the minified node image on apline linux
FROM node:slim

# Install curl and iputils (which includes ping)
RUN apt-get update && apt-get install -y curl iputils-ping

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /server

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE 3003
