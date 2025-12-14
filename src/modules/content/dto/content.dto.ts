import { IsJSON, IsString, IsUUID } from "class-validator";

export class ContentDto {

    @IsString()   
    content: string

}