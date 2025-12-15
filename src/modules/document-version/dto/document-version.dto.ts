import { IsArray, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class DocumentVersionDto {

    @IsString()
    @IsNotEmpty()
    version: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsNotEmpty()
    snapShort: any
}