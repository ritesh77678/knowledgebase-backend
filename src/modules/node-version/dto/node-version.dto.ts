import { IsJSON, IsString } from "class-validator"

export class NodeVersionDto {
    
    @IsString()
    title: string

    @IsJSON()
    snapShort: JSON

    @IsString()
    version: string
}