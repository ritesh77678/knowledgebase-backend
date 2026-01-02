import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { DocumentVersionDto } from "./dto/document-version.dto";
import { DocumentVersionService } from "./document-version.service";

@Controller("document-version")
export class DocumentVersionController {
 
    constructor(
        private readonly docummentVersionService: DocumentVersionService
    ){}

    @Post(":id")
    async createDocumentVersion(
        @Param("id") id: string,
        @Body() documentVersionDto: DocumentVersionDto
    ){
        // return await this.docummentVersionService.createDocumentVersion(id, documentVersionDto)
    }

    @Delete(":id")
    async deleteDocumentVersion(
        @Param("id") id: string
    ){
        return await this.docummentVersionService.deleteDocumentVersion(id)
    }

    @Get(":id")
    async getDocumentVersionById(
        @Param("id") id: string
    ){
        return await this.docummentVersionService.getDocumentVersionById(id)
    }

    @Get("document/:documentId")
    async getAllDocumentVersions(
        @Param("documentId") documentId: string
    ){
        return await this.docummentVersionService.getAllDocumentVersions(documentId)
    }

    @Get("tree/:documentId")
    async getDocumentTree(
        @Param("documentId") documentId: string
    ){
        return await this.docummentVersionService.getDocumentTree(documentId)
    }
}