import { Injectable, NotFoundException } from "@nestjs/common";
import { NodeVersion } from "./node-version.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NodeService } from "../node/node.service";
import { NodeVersionDto } from "./dto/node-version.dto";

@Injectable()
export class NodeVersionService {
    
    constructor(
        @InjectRepository(NodeVersion) private nodeVersionRepository: Repository<NodeVersion>,
        private readonly nodeService: NodeService
    ){}

    async createNodeVersion(nodeId: string, nodeVersionDto: NodeVersionDto) {
        const node = await this.nodeService.getNodeById(nodeId);

        // const nodeVersion = this.nodeVersionRepository.create(nodeVersionDto);
        // nodeVersion.node = node;

        // return await this.nodeVersionRepository.save(nodeVersion);
    }

    async deleteNodeVersion(nodeVersionId: string) {
        const nodeVersion = await this.getNodeVersionById(nodeVersionId);

        if (!nodeVersion) throw new NotFoundException("Node version not found");
        return await this.nodeVersionRepository.remove(nodeVersion);
    }

    async getNodeVersionById(nodeVersionId: string) {
        const nodeVersion = await this.nodeVersionRepository.findOne({where: {id: nodeVersionId}});
        if (!nodeVersion) throw new NotFoundException("Node version not found");
        return nodeVersion;
    }

    async getAllNodeVersions(nodeId: string){
        const nodeVersion = await this.nodeVersionRepository.find({
            // where: {node: {id: nodeId}},
            select: ["id", "version", "createdAt"],
        });
        if (!nodeVersion) throw new NotFoundException("Node version not found");
        return nodeVersion;
    }
}