import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: (error?: any) => void) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLenght = res.get('content-lenght')
      const responseTime = Date.now() - start;
      

      if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
        this.logger.warn(`[${method}] http://localhost:5500${originalUrl} - Status Code: ${statusCode} - Response Time: ${responseTime}ms`);
      } else {
        this.logger.log(
          `Método: ${method} Url: http://localhost:5500${originalUrl} Status Code: ${statusCode} ${contentLenght} - ${userAgent} ${ip} - Response Time: ${responseTime}ms`,
        );
      }
    });

    next();
  }
}
