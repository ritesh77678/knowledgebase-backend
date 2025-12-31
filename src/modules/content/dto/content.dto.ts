import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ContentDto {

    @IsString()
    @IsOptional()
    message: string

    @IsNotEmpty()
    contentId: string

    @IsNotEmpty()
    snapShort: any
}