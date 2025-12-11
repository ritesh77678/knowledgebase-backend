import { IsArray, IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class DocumentDto {

    @IsString()
    title: string;

    // @IsString()
    // spaceId: string;

    @IsString()
    authorId: string;

    @IsString()
    @IsEnum(['private', 'published', 'draft'])
    status: string;

    @IsArray({each: true})
    @IsString()
    @IsOptional()
    contributors: string[];

    @IsArray({each: true})
    @IsString()
    @IsOptional()
    allowedSpaces: string[];

    @IsArray({each: true})
    @IsString()
    @IsOptional()
    allowedUsers: string[];

    @IsString()
    chapters: string[];

    @IsString()
    @IsMongoId()
    pages: string;

    // @IsObject()
    // metadata: any;


    
}   