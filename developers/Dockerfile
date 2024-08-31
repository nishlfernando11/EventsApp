# # Fetching the minified node image on apline linux
# FROM node:slim

# # Declaring env
# ENV NODE_ENV production

# # Setting up the work directory
# WORKDIR /developers

# # Copying all the files in our project
# COPY . .

# # Installing dependencies
# RUN npm install


# # Build the React application
# RUN npm run build


# # Starting our application
# # CMD [ "npm", "start" ]

# CMD npm run dev

# # Exposing server port
# EXPOSE 3000


# FROM node:alpine

# # Set the working directory
# WORKDIR /app
# # Copy the package.json and package-lock.json files
# COPY package*.json ./
# # Install the dependencies
# RUN npm install
# # Copy the app files
# COPY . .
# # Build the app
# RUN npm run build

# COPY . .

# # Expose the port
# EXPOSE 3000

# # Run the app
# CMD npm start


# Use an official Node runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Serve the build directory
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
