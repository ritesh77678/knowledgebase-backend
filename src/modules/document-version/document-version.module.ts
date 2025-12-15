import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./document-version.entity";
import { DocumentVersionController } from "./document-version.controller";
import { DocumentVersionService } from "./document-version.service";
import { Module } from "@nestjs/common";
import { DocumentModule } from "../document/document.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DocumentVersion
        ]),
        DocumentModule
    ],
    controllers: [DocumentVersionController],
    providers: [DocumentVersionService]
})
export class DocumentVersionModule {}