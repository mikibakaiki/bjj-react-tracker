FROM node:lts-bullseye as dist

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code and build it
COPY . .
RUN npm run build

# Use an Nginx image to serve the built files
FROM nginx:alpine

# Copy the built files to the Nginx web server
COPY --from=dist /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]