import { PickType } from "@nestjs/swagger";
import { CreateDocumentDto } from "./create-document.dto";
import { IsString } from "class-validator";

export class UpdateDocumentDto extends PickType(CreateDocumentDto, ['title', 'description']) {

    @IsString()
    id: string
}