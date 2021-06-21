# Dwellwell API

## Setup

1. Run command `npm install -g @nestjs/cli`
2. Run command `npm install`
3. Setup MySQL Database
   - Create new table `dwellwell`
   - Create new user with full table permissions
   - Save user credentials to populate in step 4.
4. Rename `.env-example` in api to `.env` with the following MySQL Database properties that you will connect to for local development
   - DB_HOST="localhost"
   - DB_PORT=3306
   - DB_DATABASE=""
   - DB_USER="user"
   - DB_PASSWORD="password"

---

## Starting, Debugging, or Testing

1. Refer to `package.json` scripts

---

## Deployment

### `.elasticbeanstalk/README.md`

---
