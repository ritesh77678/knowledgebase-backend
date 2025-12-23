import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";

@Controller("document")
export class DocumentController {
 
    constructor(
        private readonly documentService: DocumentService
    ) {}

    @Post()
    async createDocument(
        @Body() documentDto: CreateDocumentDto
    ){
        console.log(documentDto)
        return await this.documentService.createDocument(documentDto)
    }

    @Patch(":id")
    async updateDocument(
        @Param("id") id: string, 
        @Body() documentDto: UpdateDocumentDto
    ){
        return await this.documentService.updateDocument(id, documentDto)
    }

    @Delete(":id")
    async deleteDocument(
        @Param("id") id: string
    ){
        return await this.documentService.deleteDocument(id)
    }

    @Get(":id")
    async getDocumentById(
        @Param("id") id: string
    ){
        return await this.documentService.getDocumentById(id)
    }

    @Get("author/:authorId")
    async getDocumentByAuthor(
        @Param("authorId") authorId: string
    ){
        return await this.documentService.getDocumentByAuthor(authorId)
    }

    @Get("community/:communityId")
    async getDocumentByCommunity(
        @Param("communityId") communityId: string
    ){
        return await this.documentService.getDocumentByCommunity(communityId)
    }   

    @Get("tree/:documentId")
    async getTree(@Param("documentId") documentId: string){
        console.log(documentId)
        return await this.documentService.getDocumentTree(documentId)
    }
}