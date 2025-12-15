import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateDocumentDto } from "./create-document.dto";

export class UpdateDocumentDto extends PartialType(PickType(CreateDocumentDto, ['title', 'description'])) {}