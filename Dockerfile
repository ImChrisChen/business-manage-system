FROM node:lts-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npx pnpm install
COPY . .

RUN npm run build

CMD ["node", "./dist/main.js"]