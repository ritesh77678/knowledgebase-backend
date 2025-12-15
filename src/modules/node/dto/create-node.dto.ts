import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

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
    orderIndex: string

    @IsString()
    @IsUUID()
    @IsOptional()
    parentId: string
}