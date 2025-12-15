import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

        const exists = await this.documentRepository.findOne({where: {title: documentDto.title, communityId: documentDto.communityId}})
        if (exists) throw new ConflictException("Document already exists")

        const document = this.documentRepository.create(documentDto)
        return await this.documentRepository.save(document)
    }

    async updateDocument(id: string, documentDto: UpdateDocumentDto){

        const {title, description} = documentDto

        const document = await this.documentRepository.findOne({where: {id}}) 
        if (!document) throw new NotFoundException("Document not found")

        title && (document.title = title)
        description && (document.description = description)
        
        return await this.documentRepository.save(document)
    }

    async deleteDocument(id: string){
        const document = await this.documentRepository.findOne({where: {id}})
        if (!document) throw new NotFoundException("Document not found")

        document.status = "deleted"
        return await this.documentRepository.save(document)
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