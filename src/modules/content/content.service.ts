import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "./content.entity";
import { ContentDto } from "./dto/content.dto";
import { Repository } from "typeorm";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content) private readonly contentRepository: Repository<Content>,
        private readonly redisService: RedisService
    ) { }

    // async saveContent(contentDto: ContentDto) {
    //     const content = await this.contentRepository.upsert(
    //         contentDto,
    //         {
    //             conflictPaths: ['nodeId'],
    //             skipUpdateIfNoValuesChanged: true
    //         }
    //     )

    //     const cacheKey = `content:${contentDto.nodeId}`
    //     await this.redisService.set(cacheKey, JSON.stringify(content), 3600000)

    //     return content
    // }

    async deleteContentByNodeId(nodeId: string) {
        const content = await this.contentRepository.findOne({ where: { node: { id: nodeId } } })
        if (!content) throw new NotFoundException("Content not found")

        const cacheKey = `content:${nodeId}`
        await this.redisService.del(cacheKey)

        return await this.contentRepository.remove(content)
    }

    async getContentByNodeId(nodeId: string) {

        const cacheKey = `content:${nodeId}`
        const cachedContent = await this.redisService.get(cacheKey)

        if (cachedContent) return JSON.parse(cachedContent)

        const content = await this.contentRepository.findOne({ where: { node: { id: nodeId } } })
        if (!content) throw new NotFoundException("Content not found")

        await this.redisService.set(cacheKey, JSON.stringify(content), 3600000)

        return content
    }
}