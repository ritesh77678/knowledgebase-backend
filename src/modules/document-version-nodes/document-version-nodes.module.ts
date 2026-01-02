import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersionNodes } from "./document-version-nodes.entity";
import { DocumentVersionNodesService } from "./document-version-nodes.service";
import { DocumentVersionNodesController } from "./document-version-nodes.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentVersionNodes])
    ],
    providers: [DocumentVersionNodesService],
    controllers: [DocumentVersionNodesController]
})
export class DocumentVersionNodesModule {}