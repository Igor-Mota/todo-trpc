
FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl

RUN yarn install

# Copy the rest of the application's source code to the working directory
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application for development
CMD ["npm", "run", "dev"]