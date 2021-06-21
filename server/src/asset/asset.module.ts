import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgoAccount } from './algoAsset.entity';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlgoAccount])],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService, TypeOrmModule],
})
export class AssetModule {}
