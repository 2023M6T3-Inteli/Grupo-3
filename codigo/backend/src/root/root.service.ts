import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  healthCheck() {
    return 'pong';
  }

  health() {
    return 'ping';
  }
}
