import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubchapterDocument = HydratedDocument<Subchapter>;

@Schema({ timestamps: true })
export class Subchapter {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: 'Chapter', required: true })
    chapterId: Types.ObjectId;

    @Prop({ type: Object, required: true })
    content: any;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Page' }] })
    pages: Types.ObjectId[];

    @Prop({ required: true, default: 0 })
    order: number;
}

export const SubchapterSchema = SchemaFactory.createForClass(Subchapter);
