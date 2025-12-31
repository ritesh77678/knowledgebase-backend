import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentDto } from "./dto/content.dto";

@Controller("content")
export class ContentController {
 
    constructor(
        private readonly contentService: ContentService
    ) {}

    // @Post(":id")
    // async saveContent(
    //     @Param("id") id: string,
    //     @Body() contentDto: ContentDto
    // ){
    //     return await this.contentService.saveContent(id, contentDto)
    // }

    // @Post("node/:nodeId")
    // async saveContentByNodeId(
    //     @Param("nodeId") nodeId: string,
    //     @Body() contentDto: ContentDto
    // ){
    //     return await this.contentService.saveContentByNodeId(nodeId, contentDto)
    // }

    @Delete(":nodeId")
    async deleteContent(
        @Param("nodeId") nodeId: string
        
    ){
        console.log(nodeId)
        return await this.contentService.deleteContentByNodeId(nodeId)
    }

    @Get(":nodeId")
    async getContentByNodeId(
        @Param("nodeId") nodeId: string
    ){
        return await this.contentService.getContentByNodeId(nodeId)
    }
}