import { IsEnum, IsJSON, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePageDto {

    @IsString()
    title: string;

    @IsJSON()
    content: JSON;

    @IsString()
    @IsOptional()
    @IsMongoId()
    parentId: string;

    @IsString()
    @IsOptional()
    @IsEnum(['Document', 'Chapter', 'Subchapter'])
    parentType: string;

    @IsNumber()
    order: number;
}