import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Route: ${req.originalUrl} - Method: ${req.method} - IP Address: ${req.ip} - `,
    );
    next();
  }
}
