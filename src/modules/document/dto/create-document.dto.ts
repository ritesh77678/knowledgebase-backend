import { 
    IsEnum, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    IsUUID, 
    MaxLength, 
    MinLength 
} from "class-validator";
import { DocumentStatus } from "../document.entity";
import { Transform } from "class-transformer";

export class CreateDocumentDto {
    
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(255, { message: 'Title must not exceed 255 characters' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(5000, { message: 'Description must not exceed 5000 characters' })
    @Transform(({ value }) => value?.trim())
    description?: string;

    @IsString()
    @IsNotEmpty({ message: 'Author ID is required' })
    authorId: string;

    @IsString()
    @IsNotEmpty({ message: 'Community ID is required' })
    communityId: string;

    @IsEnum(DocumentStatus, { message: 'Invalid status value' })
    @IsOptional()
    status?: DocumentStatus;
}


