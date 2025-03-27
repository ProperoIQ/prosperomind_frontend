# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables (optional, recommended to use runtime environment variables)

ENV NEXT_PUBLIC_OPENAI_API_KEY='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'

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on (default is 3000 for Next.js)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
