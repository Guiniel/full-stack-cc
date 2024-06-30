FROM node:20.14.0-alpine3.19 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:20.14.0-alpine3.19 AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/package*.json ./
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=http://backend:3001
EXPOSE 3000

CMD ["npm", "start"]
