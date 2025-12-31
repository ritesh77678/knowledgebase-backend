import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf, ValidationError } from "class-validator";

export class CreateNodeDto {
    
    @IsString()
    @IsNotEmpty()
    title: string

    @IsEnum(['chapter', 'subchapter', 'page'])
    @IsNotEmpty()
    type: 'chapter' | 'subchapter' | 'page'

    @IsString()
    authorId: string

    @IsNumber()
    orderIndex: number

    @ValidateIf((o) => o.type === 'subchapter')
    @IsUUID()
    @IsNotEmpty()
    parentId: string
}   