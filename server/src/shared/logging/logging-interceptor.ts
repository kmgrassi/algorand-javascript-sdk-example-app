import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../../config.service';

const config = new ConfigService();

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private env = config.get('ENV');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next.handle().pipe(
      tap((item) => {
        const event = `${method} ${url} ${Date.now() - now}ms`;

        Logger.log(event, context.getClass().name);
      }),
    );
  }
}
