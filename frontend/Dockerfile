# Frontend Dockerfile
FROM node:16

# Set working directory
WORKDIR /app

# Copy the package.json and install npm dependencies
COPY package.json /app/
RUN npm install

# Copy the rest of the frontend code
COPY . /app/

# Build the React app for production


# Expose the port the frontend runs on
EXPOSE 3000

# Serve the React app using a simple static server
CMD ["npm run dev"]
