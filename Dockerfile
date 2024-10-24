# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Run Prisma generate to generate the client
RUN npx prisma generate

# Expose the application port (change as needed)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
