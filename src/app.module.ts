import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Document } from './modules/document/document.entity';
import { Node } from './modules/node/node.entity';
import { Content } from './modules/content/content.entity';
import { DocumentVersion } from './modules/document-version/document-version.entity';
import { NodeVersion } from './modules/node-version/node-version.entity';
import { ContentVersion } from './modules/content-version/content-version.entity';
import { Permission } from './modules/permission/permission.entity';
import { RedisModule } from './modules/redis/redis.module';
import { AutoSaveModule } from './modules/autosave/autosave.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [
        Document,
        Node,
        Content,
        DocumentVersion,
        NodeVersion,
        ContentVersion,
        Permission,

      ],
      synchronize: true,
    }),
    RedisModule,
    AutoSaveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
