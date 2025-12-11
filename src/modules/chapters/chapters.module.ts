import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { Document, DocumentSchema } from '../documents/schemas/document.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chapter.name, schema: ChapterSchema },
            { name: Document.name, schema: DocumentSchema },
        ]),
    ],
    controllers: [ChaptersController],
    providers: [ChaptersService],
})
export class ChaptersModule { }
