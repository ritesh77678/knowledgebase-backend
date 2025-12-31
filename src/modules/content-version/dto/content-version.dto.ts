import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ContentVersionDto {
 
    @IsUUID()
    contentId: string

    @IsNotEmpty()
    snapShort: any

    @IsString()
    @IsOptional()
    message: string
}