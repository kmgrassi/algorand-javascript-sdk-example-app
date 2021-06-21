import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(req, res, next: () => any) {
    bodyParser.json()(req, res, next);
  }
}
