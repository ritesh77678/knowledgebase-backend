import { Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { ContentVersionService } from "./content-version.service";
import { stringify } from "querystring";

@Controller("content-version")
export class ContentVersionController {

    constructor(
        private readonly contentVersionService: ContentVersionService
    ) {}

    @Get(":id")
    async getContentVersionById(
        @Param("id") id: string,
    ){
        return this.contentVersionService.getContentVersionById(id)
    }

    @Patch(":id")
    async updateContentVersionById(@Param("id") id: string){
        // return this.contentVersionService.updateContentVersionById(id)
    }
}