import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./document-version.entity";
import { DocumentVersionController } from "./document-version.controller";
import { DocumentVersionService } from "./document-version.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DocumentVersion,
        ]),
    ],
    controllers: [DocumentVersionController],
    providers: [DocumentVersionService],
    exports: [DocumentVersionService]
})
export class DocumentVersionModule {}