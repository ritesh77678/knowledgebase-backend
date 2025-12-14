import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateNodeDto {
    
    @IsString()
    @IsNotEmpty()
    title: string

    @IsEnum(['chapter', 'subchapter', 'page'])
    @IsNotEmpty()
    type: 'chapter' | 'subchapter' | 'page'

    @IsString()
    authorId: string

    @IsString()
    @IsUUID()
    parentId: string

    @IsString()
    @IsUUID()
    documentId: string
}