import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../config/env';

@Injectable()
export class EnvService {
  constructor(private envService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.envService.get(key, { infer: true });
  }
}
