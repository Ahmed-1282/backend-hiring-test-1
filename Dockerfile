# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 8101

# Start the application
CMD ["npm", "run", "start:dev"]
