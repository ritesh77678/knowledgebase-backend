import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersionNodes } from "./document-version-nodes.entity";
import { DocumentVersionNodesService } from "./document-version-nodes.service";
import { DocumentVersionNodesController } from "./document-version-nodes.controller";
import { ContentVersionModule } from "../content-version/content-version.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentVersionNodes]),
        ContentVersionModule
    ],
    providers: [DocumentVersionNodesService],
    controllers: [DocumentVersionNodesController],
})
export class DocumentVersionNodesModule {}