import { DocumentVersion } from "./document-version.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentService } from "../document/document.service";
import { DataSource } from "typeorm";
import { Document } from "../document/document.entity";
import { Node } from "../node/node.entity";
import { NodeVersion } from "../node-version/node-version.entity";

@Injectable()
export class DocumentVersionService {
    constructor(
        @InjectRepository(DocumentVersion) private documentVersionRepository: Repository<DocumentVersion>,
        // @InjectRepository(Document) private documentRepository: Repository<Document>,
        private readonly documentService: DocumentService,
        private readonly dataSource: DataSource
    ) {}

    // async createDocumentVersion(documentId: string, documentVersionDto: DocumentVersionDto) {
    //     const document = await this.documentService.getDocumentById(documentId);

    //     const nodes = await this.

    //     const documentVersion = this.documentVersionRepository.create(documentVersionDto);
    //     documentVersion.document = document;

    //     const savedDocumentVersion = await this.documentVersionRepository.save(documentVersion);
        
    //     return savedDocumentVersion
    // }

    async createDocumentVersion(documentId: string){
        const document = await this.documentService.getDocumentById(documentId)
        const documentVersion = this.documentVersionRepository.create({
            document: document
        })
    }

    // async publishDocumentVersion(documentId: string){
    //     return await this.dataSource.transaction(async (manager) => {
    //         await manager.findOneOrFail(Document, {where: {id: documentId}})

    //         const draftNodes = await manager.find(Node, {
    //             where: {document: {id: documentId}},
    //             relations: ['parent', 'content']
    //         })

    //         const documentVersion = manager.create(DocumentVersion, {
    //             document: {id: documentId}
    //         })

    //         for (const oldNodes of draftNodes){
    //             const newNodes = manager.create(NodeVersion, {
    //                 title: oldNodes.title,
    //                 type: oldNodes.type,
    //                 orderIndex: oldNodes.orderIndex,
    //                 parent: oldNodes.parent,
    //                 documentVersion: documentVersion,
    //                 node: oldNodes.node,
    //                 content: oldNodes.content,
    //             })
    //         }

    //         return await manager.save(documentVersion);
    //     });
    // }

    // async publishedDocumentVersion(documentVersionDto: DocumentVersionDto, documentVersionId?: string) {

    //     const documentVersion = documentVersionId
    //         ? await this.getDocumentVersionById(documentVersionId)
    //         : await this.createDocumentVersion(documentVersionDto.documentId, documentVersionDto);

    //     const document = await this.documentService.getDocumentById(documentVersion.document.id);
    //     document.publishedVersion = documentVersion;
    //     await this.documentRepository.save(document);
    //     return documentVersion;
    // }

    async makeDocumentVersionPublished(documentVersionId: string){
    }

    async deleteDocumentVersion(documentVersionId: string) {
        // const documentVersion = await this.getDocumentVersionById(documentVersionId);
        // return await this.documentVersionRepository.remove(documentVersion);
    }

    async getDocumentVersionById(documentVersionId: string) {
        // const documentVersion = await this.documentVersionRepository.findOne({where: {id: documentVersionId}});
        // if (!documentVersion) {
        //     throw new NotFoundException("Document version not found");
        // }
        // return documentVersion;
    }

    async getAllDocumentVersions(documentId: string){
        // const documentVersion = await this.documentVersionRepository.find({
        //     where: {document: {id: documentId}},
        //     select: ["id", "version", "createdAt"],
        // });
        // if (!documentVersion) {
        //     throw new NotFoundException("Document version not found");
        // }
        // return documentVersion;
    }
}