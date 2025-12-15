import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Node } from "./node.entity";
import { NodeController } from "./node.controller";
import { NodeService } from "./node.service";
import { DocumentModule } from "../document/document.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Node
        ]),
        DocumentModule
    ],
    controllers: [NodeController],
    providers: [NodeService],
    exports: [NodeService]
})
export class NodeModule {}