import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./content.entity";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { NodeModule } from "../node/node.module";
import { ContentVersionModule } from "../content-version/content-version.module";
import { ContentVersion } from "../content-version/content-version.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Content,
            ContentVersion
        ]),
        ContentVersionModule,
        NodeModule,
    ],
    controllers: [ContentController],
    providers: [ContentService],
    exports: [ContentService]
})
export class ContentModule {}