import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { Repository } from "typeorm";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";

@Injectable()
export class DocumentService {
    
    constructor(
        @InjectRepository(Document) private readonly documentRepository: Repository<Document>
    ){}

    async createDocument(documentDto: CreateDocumentDto){
        const document = this.documentRepository.create(documentDto)
        return await this.documentRepository.save(document)
    }

    async updateDocument(documentDto: UpdateDocumentDto){
        const document = await this.documentRepository.findOne({where: {id: documentDto.id}}) 
        if (!document) throw new NotFoundException("Document not found")

        document.title = documentDto.title
        document.description = documentDto.description
        
        return await this.documentRepository.save(document)
    }

    async deleteDocument(id: string){
        const document = await this.documentRepository.findOne({where: {id}})
        if (!document) throw new NotFoundException("Document not found")

        return await this.documentRepository.remove(document)
    }

    async getDocumentById(id: string){
        const document = await this.documentRepository.findOne({where: {id}})
        if (!document) throw new NotFoundException("Document not found")

        return document
    }

    async getDocumentByAuthor(authorId: string){
        const document = await this.documentRepository.find({where: {authorId}})
        if (!document) throw new NotFoundException("Document not found")

        return document
    }

    async getDocumentByCommunity(communityId: string){
        const document = await this.documentRepository.find({where: {communityId}})
        if (!document) throw new NotFoundException("Document not found")

        return document
    }
}