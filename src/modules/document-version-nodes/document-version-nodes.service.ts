import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentVersionNodes } from './document-version-nodes.entity';
import { In, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { DocumentVersion } from '../document-version/document-version.entity';

@Injectable()
export class DocumentVersionNodesService {
  constructor(
    @InjectRepository(DocumentVersionNodes) private readonly dvRepo: Repository<DocumentVersionNodes>,
    private readonly dataSource: DataSource
  ) {}

  async deleteNodeFromVersion(nodeId: string, documentVersionId: string) {
    return this.dataSource.transaction(async (manager) => {
      const dvRepo = manager.getRepository(DocumentVersionNodes);
      const documentVersionRepo = manager.getRepository(DocumentVersion);

      const documentVersion = await documentVersionRepo.findOne({
        where: { id: documentVersionId },
      });

      if (!documentVersion) {
        throw new Error('Document version not found');
      }

      const mappings = await dvRepo.find({
        where: { documentVersion },
        relations: ['node', 'node.parent'],
      });

      const treeMap = new Map<string, string[]>();

      for (const m of mappings) {
        const parentId = m.node.parent?.id;
        if (!parentId) continue;

        if (!treeMap.has(parentId)) {
          treeMap.set(parentId, []);
        }
        treeMap.get(parentId)!.push(m.node.id);
      }

      const collectSubtree = (
        rootId: string,
        acc = new Set<string>(),
      ): Set<string> => {
        acc.add(rootId);
        const children = treeMap.get(rootId) || [];
        for (const childId of children) {
          collectSubtree(childId, acc);
        }
        return acc;
      };

      const nodeIdsToDelete = [...collectSubtree(nodeId)];

      await dvRepo.delete({
        documentVersion,
        node: {
          id: In(nodeIdsToDelete),
        },
      });

      // 6️⃣ (Optional but recommended) Cleanup orphan nodes
      await manager.query(`
      DELETE FROM node n
      WHERE NOT EXISTS (
        SELECT 1
        FROM document_version_nodes dvn
        WHERE dvn."nodeId" = n.id
      )
    `);

      return {
        deletedNodeIds: nodeIdsToDelete,
      };
    });
  }

  async getNodesById(dvId: string, nodeId: string){
    const node = await this.dvRepo.findOne({
      where: { documentVersion: { id: dvId }, node: { id: nodeId } },
    });
    if (!node) {
      throw new NotFoundException('Node not found');
    }
    return node;
  }

  async updateNodeContent(dvId: string, nodeId: string, content: any){
    const node = await this.dvRepo.findOne({
      where: { documentVersion: { id: dvId }, node: { id: nodeId } },
    });
    if (!node) {
      throw new NotFoundException('Node not found');
    }
    node.content = content;
    return await this.dvRepo.save(node);
  }
}
