import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document, DocumentStatus } from './document.entity';
import { Not, Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Logger } from '@nestjs/common';
import { Node } from '../node/node.entity';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);
  constructor(
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Node) private readonly nodeRepository: Repository<Node>,
  ) {}

  async createDocument(documentDto: CreateDocumentDto) {
    try {
      const document = this.documentRepository.create(documentDto);
      const saved = await this.documentRepository.save(document);

      this.logger.log(
        `Document created: ${saved.id} by author: ${documentDto.authorId}`,
      );

      console.log(saved)

      return saved;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `A document with title "${documentDto.title}" already exists in this community`,
        );
      }
      throw error;
    }
  }

  async updateDocument(id: string, documentDto: UpdateDocumentDto) {
    const { title, description, status } = documentDto;

    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');

    title && (document.title = title);
    description && (document.description = description);
    status && (document.description = status);

    return await this.documentRepository.save(document);
  }

  async deleteDocument(id: string) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');

    if (document.status === DocumentStatus.DELETED)
      throw new BadRequestException('Document already deleted');

    document.status = DocumentStatus.DELETED;
    return await this.documentRepository.save(document);
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
      where: { authorId, status: Not(DocumentStatus.DELETED) },
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


  async getAllDocuments(){
    const document = await this.documentRepository.find({
      where: {
        status: Not(DocumentStatus.DELETED)
      },
      select: [
        "id",
        "title",
        "description",
        "status",
        "createdAt",
        "updatedAt"
      ],
      order: {
        createdAt: "DESC"
      },
      take: 10
    })
    if(!document) throw new NotFoundException('Document not found')

    return document
  }

  async getDocumentByStatus(status: DocumentStatus){
    const document = await this.documentRepository.find({
      where: { status },
      select: [
        "id",
        "title",
        "description",
        "status",
        "createdAt",
        "updatedAt"
      ]
    });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async getDocumentTree(documentId: string) {
    const nodes = await this.nodeRepository.find({
        where: {
            document: { id: documentId },
        },
        relations: ['parent', 'content'],
        order: {
            orderIndex: 'ASC',
        },
    });

    return this.buildTree(nodes)
  }

  private buildTree(nodes: Node[]) {
    const nodeMap = new Map<string, any>();
    const roots: any[] = [];

    for (const node of nodes) {
      nodeMap.set(node.id, {
        id: node.id,
        title: node.title,
        type: node.type,
        contentId: node.content.id,
        orderIndex: node.orderIndex,
        parentId: node.parent?.id,
        children: [],
      });
    }

    for (const node of nodes) {
      const current = nodeMap.get(node.id);

      if (node.parent) {
        const parent = nodeMap.get(node.parent?.id);
        parent.children.push(current);
      } else {
        roots.push(current);
      }
    }

    return roots;
  }
}
