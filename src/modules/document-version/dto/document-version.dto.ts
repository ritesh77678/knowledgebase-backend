import { IsArray, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class DocumentVersionDto {

    @IsUUID()
    documentId: string

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