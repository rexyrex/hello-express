FROM node:20-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

# Run as non-root user
USER node

CMD ["node", "server.js"]
