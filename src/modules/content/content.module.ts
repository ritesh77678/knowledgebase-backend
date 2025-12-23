import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./content.entity";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { NodeModule } from "../node/node.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Content
        ]),
        NodeModule
    ],
    controllers: [ContentController],
    providers: [ContentService],
    exports: [ContentService]
})
export class ContentModule {}