import { IsNotEmpty } from "class-validator";

export class ContentVersionDto {
 
    @IsNotEmpty()
    snapShort: any
}