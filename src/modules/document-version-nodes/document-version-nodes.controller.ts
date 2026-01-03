import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { DocumentVersionNodesService } from "./document-version-nodes.service";
import { UpdateContentDto } from "./dto/update-content.dto";

@Controller("document-version-nodes")
export class DocumentVersionNodesController {
    
    constructor(
        private readonly documentVersionNodesService: DocumentVersionNodesService
    ){}

    @Get(":dvId/:nodeId")
    async getNodesById(
        @Param("dvId") dvId: string,
        @Param("nodeId") nodeId: string
    ){
        return this.documentVersionNodesService.getNodesById(dvId, nodeId)
    }

    @Delete(":dvId/:nodeId")
    async deleteNodeFromVersion(
        @Param("dvId") dvId: string,
        @Param("nodeId") nodeId: string
    ){
        return this.documentVersionNodesService.deleteNodeFromVersion(nodeId, dvId)
    }

    @Patch(":dvId/:nodeId/:versionId")
    async updateNodeContent(
        @Param("dvId") dvId: string,
        @Param("nodeId") nodeId: string,
        @Param("versionId") versionId: string
    ){
        return this.documentVersionNodesService.updateNodeContent(dvId, nodeId, versionId)
    }
}