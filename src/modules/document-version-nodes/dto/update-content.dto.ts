import { IsNotEmpty } from "class-validator";

export class UpdateContentDto {
    
    @IsNotEmpty()
    content: any
}