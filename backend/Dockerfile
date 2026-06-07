FROM node:22-alpine

WORKDIR /app


COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY backend ./backend/
RUN cd backend && npm run prisma:generate
RUN cd backend && npm run build

VOLUME ["/app/data"]

EXPOSE 3000
CMD ["sh", "-c", "cd backend && DATABASE_URL='file:/app/data/prod.db' npx prisma migrate deploy && node dist/src/server.js"]