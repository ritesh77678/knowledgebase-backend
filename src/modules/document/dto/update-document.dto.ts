import { IsOptional } from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateDocumentDto } from "./create-document.dto";

export class UpdateDocumentDto extends PartialType(OmitType(CreateDocumentDto, ['communityId'])) {
    @IsOptional()
    tree?: any
}