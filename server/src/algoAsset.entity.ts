export interface AlgoAccount {
  address: string;
  mnemonic: string;
}

export interface AssetTransferDto {
  senderAccount: AlgoAccount;
  recipientAccount: AlgoAccount;
  assetId: number;
  amount: number;
}
