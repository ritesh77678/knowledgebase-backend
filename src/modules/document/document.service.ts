import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';
import {
  DocumentStatus,
  DocumentVersion,
} from '../document-version/document-version.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Logger } from '@nestjs/common';
import { Node } from '../node/node.entity';
import { DataSource } from 'typeorm';
import { DocumentVersionService } from '../document-version/document-version.service';
import { DocumentVersionNodesController } from '../document-version-nodes/document-version-nodes.controller';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);
  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    private readonly documentVersionService: DocumentVersionService,
    private readonly dataSource: DataSource
  ) {}

  async createDocument(documentDto: CreateDocumentDto) {
    return await this.dataSource.transaction(async (manager) => {
      const document = manager.create(Document, {
        title: documentDto.title,
        description: documentDto.description,
        authorId: documentDto.authorId,
        communityId: documentDto.communityId,
      });
      const savedDocument = await manager.save(document);

      const documentVersion = manager.create(DocumentVersion, {
        document: savedDocument,
        version: '1.0.0',
        status: DocumentStatus.DRAFT,
      });
      const documentVersionSaved = await manager.save(documentVersion);

      savedDocument.draftVersion = documentVersionSaved;
      await manager.save(savedDocument);

      return {
        id: savedDocument.id,
        title: savedDocument.title,
        description: savedDocument.description,
        authorId: savedDocument.authorId,
        communityId: savedDocument.communityId,
        draftVersionId: savedDocument.draftVersion.id,
        createdAt: savedDocument.createdAt,
        updatedAt: savedDocument.updatedAt,
      }
    });
  }

  async updateDocument(id: string, documentDto: UpdateDocumentDto) {
    const document = await this.getDocumentById(id);
    if (!document) throw new NotFoundException('Document not found');
    Object.assign(document, documentDto);
    return await this.documentRepository.save(document);
  }

  async softDeleteDocument(id: string) {
    const document = await this.getDocumentById(id);
    return await this.documentRepository.softDelete(document);
  }

  async permanentDelete(id: string) {
    const document = await this.getDocumentById(id);
    await this.documentRepository.remove(document);
    this.logger.warn('Document deleted permanentely');
  }

  async getDocumentById(id: string) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');

    return document;
  }

  async getDocumentByAuthor(authorId: string) {
    const document = await this.documentRepository.find({
      where: { authorId },
      withDeleted: true,
    });
    if (!document) throw new NotFoundException('Document not found');

    return document;
  }

  async getDocumentByCommunity(communityId: string) {
    const document = await this.documentRepository.find({
      where: { communityId },
    });
    if (!document) throw new NotFoundException('Document not found');

    return document;
  }

  async getAllDocuments() {
    const document = await this.documentRepository.find({
      where: {},
      select: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });
    if (!document.length) throw new NotFoundException('Document not found');
    return document;
  }

  async makeDocumentPublished(dvId: string){
    const documentVersion = await this.documentVersionService.getDocumentVersionById(dvId);
    await this.documentRepository.update(
      {id: documentVersion.document.id},
      {publishedVersion: documentVersion}
    )
    return documentVersion
  }

  async getDocumentByStatus(status: DocumentStatus) {
    // const document = await this.documentRepository.find({
    //   where: { status },
    //   select: [
    //     'id',
    //     'title',
    //     'description',
    //     'status',
    //     'createdAt',
    //     'updatedAt',
    //   ],
    // });
    // if (!document) throw new NotFoundException('Document not found');
    // return document;
  }

}
