import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DocumentDocument = HydratedDocument<Document>;

@Schema({ timestamps: true })
export class Document {
    @Prop({ required: true })
    title: string;

    // @Prop({ required: true, index: true })
    // spaceId: string;

    @Prop({ required: true })
    authorId: string;

    @Prop({
        required: true,
        enum: ['private', 'published', 'draft'],
        default: 'draft',
    })
    status: string;

    @Prop({ type: [String], default: [] })
    contributors: string[];

    @Prop({ type: [String], default: [] })
    allowedSpaces: string[];

    @Prop({ type: [String], default: [] })
    allowedUsers: string[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Chapter' }] })
    chapters: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Page' }] })
    pages: Types.ObjectId[];

    @Prop({ type: Object })
    metadata: any;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
