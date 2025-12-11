import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsModule } from './modules/documents/documents.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { SubchaptersModule } from './modules/subchapters/subchapters.module';
import { PagesModule } from './modules/pages/pages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    DocumentsModule,
    ChaptersModule,
    SubchaptersModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
