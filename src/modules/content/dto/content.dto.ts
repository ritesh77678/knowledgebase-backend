import { IsNotEmpty } from "class-validator";

export class ContentDto {

    @IsNotEmpty()
    content: any
}