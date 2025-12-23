import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

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

    @ValidateIf(dto => dto.type === "subchapter" || dto.type === "page")
    @IsUUID()
    @IsNotEmpty()
    parentId?: string
}