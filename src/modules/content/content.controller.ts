import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ContentService } from "./content.service";

@Controller("content")
export class ContentController {

    constructor(
        private readonly contentService: ContentService
    ) {}

    @Patch(":contentId/:versionId")
    async updatePublishedVersion(
        @Param("contentId") contentId: string,
        @Param("versionId") versionId: string
    ){
        return await this.contentService.updatePublishedVersion(contentId, versionId)
    }

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

    @Get("versions/:contentId")
    async getAllContentVersion(
        @Param("contentId") contentId: string
    ){
        return await this.contentService.getAllContentVersion(contentId)
    }
}