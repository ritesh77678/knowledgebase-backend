import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

    async createContent(nodeId: string){
        const exists = await this.contentRepository.findOne({where: {node: {id: nodeId}}})
        if (exists) throw new ConflictException("Content already exists")

        return await this.contentRepository.save({node: {id: nodeId}})
    }

    // async saveContent(contentId: string, contentDto: ContentDto){

    //     const content = await this.contentRepository.findOne({where: {id: contentId}})
    //     if (!content) throw new NotFoundException("Content not found")

    //     content.content = contentDto.content

    //     return await this.contentRepository.save(content)
    // }

    // async saveContentByNodeId(nodeId: string, contentDto: ContentDto){
    //     const content = await this.getContentByNodeId(nodeId)
    //     content.content = contentDto.content

    //     return await this.contentRepository.save(content)
    // }

    async deleteContentByNodeId(nodeId: string) {
        const content = await this.contentRepository.findOne({ where: { node: { id: nodeId } } })
        if (!content) throw new NotFoundException("Content not found")

        const cacheKey = `content:${nodeId}`
        await this.redisService.del(cacheKey)

        return await this.contentRepository.remove(content)
    }

    async getContentByNodeId(nodeId: string) {

        // const cacheKey = `content:${nodeId}`
        // const cachedContent = await this.redisService.get(cacheKey)

        // if (cachedContent) return JSON.parse(cachedContent)

        // const content = await this.contentRepository.findOne({ where: { node: { id: nodeId } } })
        // if (!content) throw new NotFoundException("Content not found")

        // await this.redisService.set(cacheKey, JSON.stringify(content), 3600000)

        // return content

        const content = await this.contentRepository.findOne({where: {node: {id: nodeId}}})
        if (!content) throw new NotFoundException("Content not found")
        return content
    }

    async getContentById(contentId: string){
        const content =  await this.contentRepository.findOne({where: {id: contentId}})
        if (!content) throw new NotFoundException("Content not found")
        return content
    }
}