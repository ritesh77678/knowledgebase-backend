import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subchapter } from './schemas/subchapter.schema';
import { Chapter } from '../chapters/schemas/chapter.schema';

@Injectable()
export class SubchaptersService {
    constructor(
        @InjectModel(Subchapter.name) private subchapterModel: Model<Subchapter>,
        @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    ) { }

    async create(createSubchapterDto: any): Promise<Subchapter> {
        const chapter = await this.chapterModel.findById(createSubchapterDto.chapterId);
        if (!chapter) {
            throw new NotFoundException('Chapter not found');
        }
        const createdSubchapter = new this.subchapterModel(createSubchapterDto);
        return createdSubchapter.save();
    }

    async findAllByChapter(chapterId: string): Promise<Subchapter[]> {
        return this.subchapterModel.find({ chapterId: new Types.ObjectId(chapterId) }).exec();
    }
}
