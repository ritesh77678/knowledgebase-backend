import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateNodeDto } from "./dto/create-node.dto";
import { NodeService } from "./node.service";
import { UpdateNodeDto } from "./dto/update-node.dto";

@Controller("node")
export class NodeController {

    constructor(
        private readonly nodeService: NodeService
    ) {}

    @Post(":dvId")
    async createNode(
        @Param("dvId") dvId: string,
        @Body() nodeDto: CreateNodeDto
    ){

        console.log(nodeDto)
        return await this.nodeService.createNode(dvId, nodeDto)
    }

    @Patch(":id")
    async updateNode(
        @Param("id") id: string, 
        @Body() nodeDto: UpdateNodeDto
    ){
        return await this.nodeService.updateNode(id, nodeDto)
    }

    @Delete(":id")
    async deleteNode(
        @Param("id") id: string
    ){
        console.log("deleting node", id)
        return await this.nodeService.deleteNode(id)
    }

    @Get(":id")
    async getNodeById(
        @Param("id") id: string
    ){
        return await this.nodeService.getNodeById(id)
    }

    @Get("parent/:parentId")
    async getNodesByParentId(
        @Param("parentId") parentId: string
    ){
        return await this.nodeService.getNodesByParentId(parentId)
    }
}   