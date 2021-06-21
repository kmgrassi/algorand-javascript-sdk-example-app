import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req, res, next: () => any) {
    bodyParser.raw({ type: '*/*' })(req, res, next);
  }
}
