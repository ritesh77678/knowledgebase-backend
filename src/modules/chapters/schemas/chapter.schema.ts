import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({ timestamps: true })
export class Chapter {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: 'Document', required: true })
    documentId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Subchapter' }] })
    subchapters: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Page' }] })
    pages: Types.ObjectId[];

    @Prop({ required: true, default: 0 })
    order: number;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
