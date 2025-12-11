import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subchapter, SubchapterSchema } from './schemas/subchapter.schema';
import { SubchaptersController } from './subchapters.controller';
import { SubchaptersService } from './subchapters.service';
import { Chapter, ChapterSchema } from '../chapters/schemas/chapter.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Subchapter.name, schema: SubchapterSchema },
            { name: Chapter.name, schema: ChapterSchema },
        ]),
    ],
    controllers: [SubchaptersController],
    providers: [SubchaptersService],
})
export class SubchaptersModule { }
