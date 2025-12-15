import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NodeVersion } from "./node-version.entity";
import { NodeVersionController } from "./node-version.controller";
import { NodeVersionService } from "./node-version.service";
import { NodeModule } from "../node/node.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NodeVersion
        ]),
        NodeModule
    ],
    controllers: [NodeVersionController],
    providers: [NodeVersionService],
    // exports: [NodeVersionService]
})
export class NodeVersionModule {}