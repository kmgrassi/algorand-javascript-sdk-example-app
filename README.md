# Algorand JavaScript SDK example app

Link to working app: https://algorand-client.herokuapp.com

## Overview

This is a monorepo of a fullstack react app/express api that demonstrates some of the functionality of the [Algorand JavaScrip SDK](https://github.com/algorand/js-algorand-sdk) and the [Purestake Algorand SDK](https://developer.purestake.io/code-samples)

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

The `db.json` file is preloaded with several Algorand test accounts. The `db.json` file is an array of account objects that have two properties: `address` and `mnemonic` both are strings.

PLEASE NOTE - you would never store the mnemonics like this as anyone who has the mnemonic would have full access to the accounts.

When the app loads it pulls the address information from the Algorand testnet and renders it in the dropdown. Here is the list of data presented:

- Account balance - number of (test) algos held by the account.
- Link to the address's data in [algoexplorer](https://testnet.algoexplorer.io/)
- Assets created table - all the Algorand assets created by this address
- Assets owned table - all the assets currently owned by this address
- If the address has a zero balance a link to an [Algorand dispense](https://testnet.algoexplorer.io/dispenser) will render. An address has to have a minimum amount of algos to create or transfer assets (100,000 micoalgos).

### Create new address

This button will create a new address by running the `algosdk.generateAccount()` function. The address and mnemonic are added to `db.json` file.

### Create asset

This button opens modal that allows you to create an asset. You select the address who should create the asset, the name and the quantity. The api uses the `algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject()` function to create the asset with the data provided and suggested params. An address has to have a minimum amount of algos to create or transfer assets (100,000 micoalgos).

### Transfer asset

This button opens a modal that allows you to transfer an asset. When you select an asset the asset owner's address will be selected as the "from' account. You can then select the "to" address and the amount to transfer.

### Other api functions

These functions are also included in the api but do not have the frontend functionality built out yet.

- `getAlgoAssets(assetName)` - searches the Algorand network for assets with a given name.
- `lookupAssetsById(assetId)` - finds asset info by id.
- `lookupAssetsBalances(assetId)` - finds the balances (owners) of a given asset.
- `createAndFundAlgoAccount(adminAccount)` - creates an Algorand account and sends 1 algo to the newly generated address from an `adminAccount`. You would use a function like this in production to fund a new account prior to using it (creating or transferring assets).
- `sendAlgos()` - send algo from one account to another.
- `initiateAssetClawback()` - Creators of assets can "clawback" assets from addresses ([more info](https://developer.algorand.org/docs/features/asa/#revoking-an-asset)). This function allows you to take assets back from a target account.
- `assetDestroy()` - if a creator address holds all the assets they may delete the assets. This function does this.

---

## References

- https://github.com/algorand/js-algorand-sdk
- https://developer.purestake.io/code-samples
- https://sophiali.dev/how-to-deploy-monorepo-to-heroku
- https://testnet.algoexplorer.io/

---
