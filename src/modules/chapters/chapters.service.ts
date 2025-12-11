import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Document } from '../documents/schemas/document.schema';

@Injectable()
export class ChaptersService {
    constructor(
        @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
        @InjectModel(Document.name) private documentModel: Model<Document>,
    ) { }

    async create(createChapterDto: any): Promise<Chapter> {
        // Verify parent document exists
        const doc = await this.documentModel.findById(createChapterDto.documentId);
        if (!doc) {
            throw new NotFoundException('Document not found');
        }
        const createdChapter = new this.chapterModel(createChapterDto);
        return createdChapter.save();
    }

    async findAllByDocument(documentId: string): Promise<Chapter[]> {
        return this.chapterModel.find({ documentId: new Types.ObjectId(documentId) }).exec();
    }
}
