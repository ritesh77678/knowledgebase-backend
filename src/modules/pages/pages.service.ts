import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Page } from './schemas/page.schema';
import { Document } from '../documents/schemas/document.schema';
import { Chapter } from '../chapters/schemas/chapter.schema';
import { Subchapter } from '../subchapters/schemas/subchapter.schema';

@Injectable()
export class PagesService {
    constructor(
        @InjectModel(Page.name) private pageModel: Model<Page>,
        @InjectModel(Document.name) private documentModel: Model<Document>,
        @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
        @InjectModel(Subchapter.name) private subchapterModel: Model<Subchapter>,
    ) { }

    async create(createPageDto: any): Promise<Page> {
        const { parentId, parentType } = createPageDto;

        let parentExists = false;
        if (parentType === 'Document') {
            parentExists = !!(await this.documentModel.findById(parentId));
        } else if (parentType === 'Chapter') {
            parentExists = !!(await this.chapterModel.findById(parentId));
        } else if (parentType === 'Subchapter') {
            parentExists = !!(await this.subchapterModel.findById(parentId));
        } else {
            throw new BadRequestException('Invalid parentType');
        }

        if (!parentExists) {
            throw new NotFoundException(`${parentType} not found`);
        }

        const createdPage = new this.pageModel(createPageDto);
        return createdPage.save();
    }

    async findAllByParent(parentId: string): Promise<Page[]> {
        return this.pageModel.find({ parentId: new Types.ObjectId(parentId) }).exec();
    }

    async findOne(id: string): Promise<Page | null> {
        return this.pageModel.findById(id).exec();
    }
}
