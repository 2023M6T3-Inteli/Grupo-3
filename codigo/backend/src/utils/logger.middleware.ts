import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: (error?: any) => void) {
    const { ip, method, protocol, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();
    const reqDatetime = moment().tz('America/Sao_Paulo').format();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;
      const url = `http://localhost:5500${originalUrl}`;
      
      if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
        this.logger.warn(
          `Método: ${method} Url: ${url} Protocolo de Acesso: [${protocol}] Status Code: ${statusCode} - Navegador: ${userAgent} - IP: ${ip} - Response Time: ${responseTime}ms - Request Datetime: ${reqDatetime}`,
        );
      } else {
        this.logger.log(
          `Método: ${method} Url: ${url} Protocolo de Acesso: [${protocol}] Status Code: ${statusCode} - Navegador: ${userAgent} - IP: ${ip} - Response Time: ${responseTime}ms - Request Datetime: ${reqDatetime}`,
        );
      }
    });

    next();
  }
}
