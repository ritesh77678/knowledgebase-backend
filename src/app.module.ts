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
import { Permission } from './modules/permission/permission.entity';
import { RedisModule } from './modules/redis/redis.module';
import { AutoSaveModule } from './modules/autosave/autosave.module';
import { DocumentModule } from './modules/document/document.module';
import { NodeModule } from './modules/node/node.module';
import { ContentModule } from './modules/content/content.module';
import { DocumentVersionModule } from './modules/document-version/document-version.module';
import { NodeVersionModule } from './modules/node-version/node-version.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ContentVersionModule } from './modules/content-version/content-version.module';
import { ContentVersion } from './modules/content-version/content-version.entity';

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
        ContentVersion,
        DocumentVersion,
        NodeVersion,
        Permission,

      ],
      synchronize: false,
      migrationsRun: true
    }),
    RedisModule,
    AutoSaveModule,
    DocumentModule,
    NodeModule,
    ContentModule,
    ContentVersionModule,
    DocumentVersionModule,
    NodeVersionModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
