# Refera - Fullstack code challenge

## Description
This project contains the API (backend) and Web admin (frontend) applications

## Cloning application
```bash
git clone
```

## Install dependencies

### API (backend)
1. Enter application directory
2. Go to api directory
```bash
cd api
```
3. Install dependencies
```bash
yarn
or
npm install
```

### WEB (frontend)
1. Enter application directory
2. Go to api directory
```bash
cd web
```
3. Install dependencies
```bash
yarn
or
npm install
```

## API (backend) additional config

### docker-compose
Api was build using PostgreSQL. Before running the application, a docker
container with PostgreSQL server must be initialized.
To do this, follow the instructions below:

1. Enter application directory
2. Go to api directory
```bash
cd api
```
3. Run the command
```bash
docker-compose up -d
```

### migrations
After docker-compose, migrations should be run
To do this, follow the instructions below:

1. Enter application directory
2. Go to api directory
```bash
cd api
```
3. Run the command:
```bash
yarn prisma migrate deploy
```

### .env
The backend by default should run on port 3335.

Please rename the file:
```bash
.env.example
```
to
```bash
.env
```
And adjust the environment variables case necessary

## WEB (frontend) additional config

### .env
The frontend by default should run on port 3000.

Please rename the file:
```bash
.env.example
```
to
```bash
.env
```
And adjust the environment variables case necessary

## Running

### API (backend) in dev mode
1. Enter application directory
2. Go to api directory
```bash
cd api
```
3. Run application
```bash
yarn dev
or
npm run dev
```

### WEB (frontend) in dev mode
1. Enter application directory
2. Go to web directory
```bash
cd web
```
3. Run application
```bash
yarn start
or
npm run start
```
