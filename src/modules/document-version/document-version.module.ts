import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./document-version.entity";
import { DocumentVersionController } from "./document-version.controller";
import { DocumentVersionService } from "./document-version.service";
import { Module } from "@nestjs/common";
import { DocumentModule } from "../document/document.module";
import { Document } from "../document/document.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DocumentVersion,
            Document
        ]),
        DocumentModule
    ],
    controllers: [DocumentVersionController],
    providers: [DocumentVersionService]
})
export class DocumentVersionModule {}