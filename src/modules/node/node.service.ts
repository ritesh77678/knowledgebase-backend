import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Node } from "./node.entity";
import { Repository } from "typeorm";
import { CreateNodeDto } from "./dto/create-node.dto";
import { UpdateNodeDto } from "./dto/update-node.dto";
import { DataSource } from "typeorm";
import { Document } from "../document/document.entity";
import { Content } from "../content/content.entity";

@Injectable()
export class NodeService {
    constructor(
        @InjectRepository(Node) private readonly nodeRepository: Repository<Node>,
        private readonly dataSource: DataSource
    ) { }

    async createNode(documentId: string, nodeDto: CreateNodeDto) {
        return await this.dataSource.transaction(async (manager) => {

            await manager.findOneByOrFail(Document, {
                id: documentId,
            });

            if (["subchapter", "page"].includes(nodeDto.type)) {
                await manager.findOneByOrFail(Node, {
                    id: nodeDto.parentId,
                })
            }

            const node = manager.create(Node, {
                ...nodeDto,
                parent: { id: nodeDto.parentId },
                document: { id: documentId },
            });

            const savedNode = await manager.save(node);

            const content = manager.create(Content, {
                node: { id: savedNode.id },
            });

            const savedContent = await manager.save(content);

            savedNode.content = savedContent;

            return savedNode;
        });
    }


    async updateNode(id: string, nodeDto: UpdateNodeDto) {

        const { title, type, parentId } = nodeDto

        const node = await this.nodeRepository.findOne({ where: { id } })
        if (!node) throw new NotFoundException("Node not found")

        title && (node.title = title)
        type && (node.type = type)

        if (parentId){
            const parent = await this.nodeRepository.findOne({ where: { id: parentId } })
            if (!parent) throw new NotFoundException("Parent node not found")
            node.parent = parent
        }

        return await this.nodeRepository.save(node)
    }

    async deleteNode(id: string) {
        const node = await this.nodeRepository.findOne({ where: { id } })
        if (!node) throw new NotFoundException("Node not found")

        return await this.nodeRepository.remove(node)
    }

    async getNodeById(id: string) {
        const node = await this.nodeRepository.findOne({ where: { id } })
        if (!node) throw new NotFoundException("Node not found")

        return node
    }

    async getNodesByParentId(parentId: string) {
        const node = await this.nodeRepository.find({ where: { parent: { id: parentId } } })
        if (!node) throw new NotFoundException("Node not found")

        return node
    }

    async getDocumentTree(documentId: string) {
  const nodes = await this.nodeRepository.find({
    where: {
      document: { id: documentId },
    },
    relations: ["parent"],
    order: {
      orderIndex: "ASC",
    },
  });

  return this.buildTree(nodes);
}

private buildTree(nodes: Node[]) {
  const nodeMap = new Map<string, any>();
  const roots: any[] = [];

  for (const node of nodes) {
    nodeMap.set(node.id, {
      id: node.id,
      title: node.title,
      type: node.type,
      orderIndex: node.orderIndex,
      children: [],
    });
  }

  for (const node of nodes) {
    const current = nodeMap.get(node.id);

    if (node.parent) {
      const parent = nodeMap.get(node.parent.id);
      parent.children.push(current);
    } else {
      roots.push(current);
    }
  }

  return roots;
}

}