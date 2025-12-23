import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentVersion } from "./content-version.entity";
import { ContentVersionService } from "./content-version.service";
import { ContentVersionController } from "./content-version.controller";
import { ContentModule } from "../content/content.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ContentVersion]),
        ContentModule
    ],
    providers: [ContentVersionService],
    controllers: [ContentVersionController],
    exports: [ContentVersionService]
})
export class ContentVersionModule {}