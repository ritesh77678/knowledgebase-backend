import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Document, DocumentSchema } from '../documents/schemas/document.schema';
import { Chapter, ChapterSchema } from '../chapters/schemas/chapter.schema';
import { Subchapter, SubchapterSchema } from '../subchapters/schemas/subchapter.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Page.name, schema: PageSchema },
            { name: Document.name, schema: DocumentSchema },
            { name: Chapter.name, schema: ChapterSchema },
            { name: Subchapter.name, schema: SubchapterSchema },
        ]),
    ],
    controllers: [PagesController],
    providers: [PagesService],
})
export class PagesModule { }
