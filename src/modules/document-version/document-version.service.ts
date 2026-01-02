import { DocumentStatus, DocumentVersion } from './document-version.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { DocumentVersionNodes } from '../document-version-nodes/document-version-nodes.entity';

@Injectable()
export class DocumentVersionService {
  constructor(
    @InjectRepository(DocumentVersion)
    private documentVersionRepository: Repository<DocumentVersion>,
    private readonly dataSource: DataSource,
  ) {}

  async getDocumentTree(documentVersionId: string) {
    const dvnRepo = this.dataSource.getRepository(DocumentVersionNodes);

    const mappings = await dvnRepo.find({
      where: {
        documentVersion: { id: documentVersionId },
      },
      relations: {
        node: {
          parent: true,
          content: true,
        },
      },
      order: {
        node: {
          orderIndex: 'ASC',
        },
      },
    });

    const nodeMap = new Map<string, any>();

    for (const m of mappings) {
      nodeMap.set(m.node.id, {
        id: m.node.id,
        title: m.node.title,
        type: m.node.type,
        orderIndex: m.node.orderIndex,
        contentId: m.node.content?.id ?? null,
        children: [],
        parentId: m.node.parent?.id ?? null,
      });
    }

    const roots: any[] = [];

    for (const node of nodeMap.values()) {
      if (node.parentId && nodeMap.has(node.parentId)) {
        nodeMap.get(node.parentId).children.push(node);
      } else {
        roots.push(node);
      }
    }

    const sortTree = (nodes: any[]) => {
      nodes.sort((a, b) => a.orderIndex - b.orderIndex);
      nodes.forEach((n) => sortTree(n.children));
    };

    sortTree(roots);

    return roots;
  }

  async createNewDocumentVersionFromExisting(documentVersionId: string){
    
  }

  async makeDocumentVersionPublished(documentVersionId: string) {

    const documentVersion = await this.getDocumentVersionById(documentVersionId);
    documentVersion.status = DocumentStatus.PUBLISHED;
    documentVersion.document.publishedVersion = documentVersion;

    return await this.documentVersionRepository.save(documentVersion);
  }

  async deleteDocumentVersion(documentVersionId: string) {
    // const documentVersion = await this.getDocumentVersionById(documentVersionId);
    // return await this.documentVersionRepository.remove(documentVersion);
  }

  async getDocumentVersionById(documentVersionId: string) {
    const documentVersion = await this.documentVersionRepository.findOne({
      where: { id: documentVersionId },
      relations: {
        document: true
      }
    });
    if (!documentVersion) {
      throw new NotFoundException('Document version not found');
    }
    return documentVersion;
  }

  async getAllDocumentVersions(documentId: string) {
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
