import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AlgoAccount, AssetTransferDto } from './algoAsset.entity';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  @ApiOperation({
    summary: 'Get accounts',
    description: 'Get accounts',
  })
  async getAccounts(): Promise<AlgoAccount[]> {
    return await this.assetService.getAccounts().catch((err) => {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    });
  }

  @Get('/account/:id')
  @ApiOperation({
    summary: 'Get algo account/address from indexer',
    description: 'Get algo account/address from indexer',
  })
  async getAssetsBalances(@Param('id') id: string): Promise<any> {
    return await this.assetService.lookupAddressById(id).catch((err) => {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    });
  }

  @Get('/name/:assetName')
  @ApiOperation({
    summary: 'Get asset by name',
    description: 'Gets an asset by name',
  })
  async getAlgo(@Param('assetName') assetName: string): Promise<any> {
    return await this.assetService.getAlgoAssets(assetName);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get asset by id',
    description: 'Gets a asset with the specified id',
  })
  async getAssetById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    const asset = await this.assetService.lookupAssetsById(id);
    return asset;
  }

  @Post('/optin')
  @ApiOperation({
    summary: 'Create an optin for an algorand account to accept a transfer ',
    description:
      'Create an optin for an algorand account to accept a transfer ',
  })
  async createOptIn(
    @Body()
    data: {
      address: string;
      mnemonic: string;
      assetId: number;
    },
  ): Promise<any> {
    return await this.assetService.assetTransferOptIn(
      data.address,
      data.assetId,
    );
  }

  @Post('/transfer')
  @ApiOperation({
    summary: 'Transfer an asset ',
    description: 'Transfer an asset ',
  })
  async transferAsset(
    @Body()
    data: AssetTransferDto,
  ): Promise<any> {
    return await this.assetService.createAssetTransferWithAssetInfo(data);
  }

  @Post('/account')
  @ApiOperation({
    summary: 'Create an algorand account/address',
    description: 'Create an algorand account/address',
  })
  async createAddress(): Promise<any> {
    return await this.assetService.generateAlgorandAccount();
  }

  @Post('/clawback')
  @ApiOperation({
    summary: 'Initiate an asset clawback',
    description:
      'Initiate an asset clawback - take back an asset from an address',
  })
  async initiateClawback(
    @Body()
    data: {
      targetAddr: string;
      assetId: number;
      amount: number;
    },
  ): Promise<any> {
    return await this.assetService
      .initiateAssetClawback(data.targetAddr, data.assetId, data.amount)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
      });
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new algo asset',
    description: 'Create a new algo asset',
  })
  createAlgoAsset(
    @Body()
    data: {
      totalTokens: number;
      tokenName: string;
      address: string;
    },
  ): Promise<any> {
    return this.assetService.createNewAlgoAsset(data).catch((err) => {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    });
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Destroy an algorand asset by id',
    description: 'Destroy an algorand asset by id',
  })
  async deleteAsset(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return await this.assetService.assetDestroy(id).catch((err) => {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    });
  }
}
