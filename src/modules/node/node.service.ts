import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Node } from "./node.entity";
import { Repository } from "typeorm";
import { CreateNodeDto } from "./dto/create-node.dto";
import { UpdateNodeDto } from "./dto/update-node.dto";

@Injectable()
export class NodeService {
    constructor(
        @InjectRepository(Node) private readonly nodeRepository: Repository<Node>
    ){}

    async createNode(nodeDto: CreateNodeDto){
        const node = this.nodeRepository.create(nodeDto)
        return await this.nodeRepository.save(node)
    }

    async updateNode(nodeDto: UpdateNodeDto){
        const node = await this.nodeRepository.findOne({where: {id: nodeDto.id}}) 
        if (!node) throw new NotFoundException("Node not found")

        node.title = nodeDto.title
        node.type = nodeDto.type
        node.parentId = nodeDto.parentId

        return await this.nodeRepository.save(node)
    }

    async deleteNode(id: string){
        const node = await this.nodeRepository.findOne({where: {id}})
        if (!node) throw new NotFoundException("Node not found")

        return await this.nodeRepository.remove(node)
    }

    async getNodeById(id: string){
        const node = await this.nodeRepository.findOne({where: {id}})
        if (!node) throw new NotFoundException("Node not found")

        return node
    }

    async getNodesByParentId(parentId: string){
        const node = await this.nodeRepository.find({where: {parentId}})
        if (!node) throw new NotFoundException("Node not found")

        return node
    }
}