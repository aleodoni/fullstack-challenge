# Refera - Fullstack code challenge

## Description
This project contains the API (backend) and Web admin (frontend) applications

The backend was made using essentially node, express and prisma

The frontend was made using node, react, redux and material-ui

Both (backend & frontend) were written in Typescript

## Cloning application
```bash
git clone https://github.com/aleodoni/fullstack-challenge.git
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

# Database structure for other tables

## Real estate agency
For real estate agency, the table structure could be something like:

```sql
Table RealState
id      int     autoincrement
agency  string
address string
city    string
state   string
...other fields
```

## Company
For company, the table structure could be something like:

```sql
Table Company
id        int     autoincrement
company   string
address   string
city      string
state     string
contacts  CompanyContact[]
...other fields

Table CompanyContact
id            int     autoincrement
contactName   string
company       Company
companyId     int
contactPhone  string
```

Of course, the api should be modified. Must be implement CRUD services to provide
entrypoint for the new tables and Order table and services should be modified and
linked to the Company table.

# Authentication
Authentication could be implemented in many different ways. For this specific
application I would create a User table with user information and create login page
where the user must provide email/password to enter the application.
If email/password are correct, the api would generate a JWT with some user information
and store it into a cookie for example.
After that, we could implement a middleware layer to check the user credentials for
all pages that need it.
