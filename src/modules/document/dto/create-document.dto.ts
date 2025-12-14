import { IsOptional, IsString, MinLength } from "class-validator"

export class CreateDocumentDto {
    
    @IsString()
    @MinLength(4)
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    authorId: string 

    @IsString()
    communityId: string
}