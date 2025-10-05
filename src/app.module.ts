import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from './config/mikro-orm.config';
import { EnvModule } from './modules/env/env.module';
import { UrlModule } from './modules/urls/urls.module';

@Module({
  imports: [EnvModule, MikroOrmModule.forRoot(config), UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
