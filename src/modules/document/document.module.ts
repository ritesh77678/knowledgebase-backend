import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { Node } from "../node/node.entity";
import { DocumentVersion } from "../document-version/document-version.entity";
import { DocumentVersionModule } from "../document-version/document-version.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Document,
        ]),
        DocumentVersionModule
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [DocumentService]
})
export class DocumentModule {}