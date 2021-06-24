import { AssetService } from './asset.service';
const express = require('express');
const app = express();
const fs = require('fs');
const data = require('../src/db.json');
const bodyParser = require('body-parser');

const assetService = new AssetService();
app.use(bodyParser.json());
const prefix = '/api';
const port = 3000;

app.get(prefix, (req, res) => {
  res.send(data);
});

app.get(prefix + '/asset/account/:id', async (req, res) => {
  const address = req.params.id;
  let asset = '';

  if (address) {
    asset = await assetService.lookupAddressById(address);
  }

  res.send(asset);
});

// Create a new alogrand account
app.post(prefix + '/asset/account', async (req, res) => {
  const account = await assetService.generateAlgorandAccount();

  if (account) {
    data.push(account);

    fs.writeFile(__dirname + '/db.json', JSON.stringify(data), (err) => {
      if (err) Promise.reject(err);
    });
  }

  res.send(data);
});

// Transfer an algorand asset
app.post(prefix + '/asset/transfer', async (req, res) => {
  let asset;
  const { body } = req;

  const senderAccount = data.find((account) => {
    return account.address === body.senderAddress;
  });

  const recipientAccount = data.find((account) => {
    return account.address === body.recipientAddress;
  });

  if (senderAccount && recipientAccount) {
    const transferData = {
      senderAccount,
      recipientAccount,
      assetId: body.assetId,
      amount: body.amount,
    };
    asset = await assetService.createAssetTransferWithAssetInfo(transferData);
  }

  res.send(asset);
});

// Create an algorand asset
app.post(prefix + '/asset', async (req, res) => {
  let asset;
  const { body } = req;

  const account = data.find((account) => {
    return account.address === body.address;
  });

  if (account) {
    const { mnemonic } = account;
    asset = await assetService.createNewAlgoAsset(body, mnemonic);
  }

  res.send(asset);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
