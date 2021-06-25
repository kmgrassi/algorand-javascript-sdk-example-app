# Algorand JavaScript SDK example app

Link to working app: https://algorand-client.herokuapp.com

## Overview

This is a monorepo of a fullstack react app that demonstrates some of the functionality of the [Algorand JavaScrip SDK](https://github.com/algorand/js-algorand-sdk) and the [Purestake Algorand SDK](https://developer.purestake.io/code-samples)

---

## Features

- React/TypeScript frontend
- Express server backend
- Single db.json file as db

## Installation

1. Clone repo
   - `git clone https://github.com/kmgrassi/fullstack-algorand-sdk-example.git`
2. Npm install
   - `cd client`
   - `npm install`
   - `cd server`
   - `npm install`
3. Get Purestake api key
   - https://developer.purestake.io/signup
   - Copy api key into `.env` file in `server` directory:
   - `PURESTAKE_KEY="YOUR-KEY"`
4. Run
   - In client directory `npm run start`
   - In server directory `npm run start:dev`

---

## How it works

### Overview

### Create new address

### Create asset

### Transfer asset

---

## References

- https://github.com/algorand/js-algorand-sdk
- https://developer.purestake.io/code-samples
- https://sophiali.dev/how-to-deploy-monorepo-to-heroku

---
