import { Module } from "@nestjs/common";
import { AutoSaveService } from "./autosave.service";
import AutoSaveController from "./autosave.controller";

@Module({
    providers: [AutoSaveService],
    controllers: [AutoSaveController],
    exports: [AutoSaveService]
})
export class AutoSaveModule {}