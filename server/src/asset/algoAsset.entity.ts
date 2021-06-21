import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@Entity()
export class AlgoAccount {
  @PrimaryColumn()
  address: string;

  @Column()
  mnemonic: string;
}

export interface AssetTransferDto {
  senderAddress: string;
  recipientAddress: string;
  assetId: number;
  amount: number;
}
