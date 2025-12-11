import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Object, required: true })
    content: any;

    @Prop({ type: Types.ObjectId })
    parentId: Types.ObjectId;

    @Prop({
        enum: ['Document', 'Chapter', 'Subchapter'],
    })
    parentType: string;

    @Prop({ default: 0 })
    order: number;
}

export const PageSchema = SchemaFactory.createForClass(Page);
