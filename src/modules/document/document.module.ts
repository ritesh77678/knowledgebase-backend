import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { Node } from "../node/node.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Document,
            Node
        ])
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [DocumentService]
})
export class DocumentModule {}