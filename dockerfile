FROM node:lts-bullseye as nodebuild

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
# /app/dist is the built folder.
COPY --from=nodebuild /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]