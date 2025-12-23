import { IsString, IsOptional, MinLength, MaxLength, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { DocumentStatus } from "../document.entity";

export class UpdateDocumentDto {
    
    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(255, { message: 'Title must not exceed 255 characters' })
    @Transform(({ value }) => value?.trim())
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(5000, { message: 'Description must not exceed 5000 characters' })
    @Transform(({ value }) => value?.trim())
    description?: string;

    @IsEnum(DocumentStatus, { message: 'Invalid status value' })
    @IsOptional()
    status?: DocumentStatus;
}