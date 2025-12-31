import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AutoSaveService } from "./autosave.service";
import { ContentVersionDto } from "../content-version/dto/content-version.dto";

@Controller('autosave')
export default class AutoSaveController {
 
    constructor(private readonly autoSaveService: AutoSaveService) {}

    @Get()
    async getAutoSave(){
        return "Autosave is working"
    }

    @Post()
    async enqueueContent(
        @Body() payload: ContentVersionDto
    ){
        return this.autoSaveService.enqueueAutoSave(payload)
    }
}