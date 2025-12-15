import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { NodeVersionDto } from "./dto/node-version.dto";
import { NodeVersionService } from "./node-version.service";

@Controller("node-version")
export class NodeVersionController {
 
    constructor(
        private readonly nodeVersionService: NodeVersionService
    ){}

    @Post(":id")
    async createNodeVersion(
        @Param("id") id: string,
        @Body() nodeVersionDto: NodeVersionDto
    ){
        return await this.nodeVersionService.createNodeVersion(id, nodeVersionDto)
    }

    @Delete(":id")
    async deleteNodeVersion(
        @Param("id") id: string
    ){
        return await this.nodeVersionService.deleteNodeVersion(id)
    }

    @Get(":id")
    async getNodeVersionById(
        @Param("id") id: string
    ){
        return await this.nodeVersionService.getNodeVersionById(id)
    }

    @Get("node/:nodeId")
    async getAllNodeVersions(
        @Param("nodeId") nodeId: string
    ){
        return await this.nodeVersionService.getAllNodeVersions(nodeId)
    }
}
