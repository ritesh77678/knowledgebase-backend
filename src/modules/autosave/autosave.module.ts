import { Module } from "@nestjs/common";
import { AutoSaveService } from "./autosave.service";

@Module({
    providers: [AutoSaveService],
    exports: [AutoSaveService]
})
export class AutoSaveModule {}