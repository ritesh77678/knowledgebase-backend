import { PickType } from "@nestjs/swagger";
import { CreateNodeDto } from "./create-node.dto";
import { IsString } from "class-validator";

export class UpdateNodeDto extends PickType(CreateNodeDto, ['title', 'type', 'parentId']) {
    
    @IsString()
    id: string
}