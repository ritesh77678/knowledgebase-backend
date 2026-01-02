import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { ContentVersionService } from '../content-version/content-version.service';
import { ContentVersion } from '../content-version/content-version.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly contentVersionRepository: Repository<ContentVersion>,
    private readonly contentVersionService: ContentVersionService,
    private readonly redisService: RedisService,
  ) {}

  async createContent(nodeId: string) {
    const exists = await this.contentRepository.findOne({
      where: { node: { id: nodeId } },
    });
    if (exists) throw new ConflictException('Content already exists');

    return await this.contentRepository.save({ node: { id: nodeId } });
  }

  async updatePublishedVersion(contentId: string, versionId: string) {
    const contentVersion =
      await this.contentVersionService.getContentVersion(versionId);

    const content = await this.getContentById(contentId);
    content.publishedVersion = contentVersion;
    return await this.contentRepository.save(content);
  }

  async deleteContentByNodeId(nodeId: string) {
    const content = await this.contentRepository.findOne({
      where: { node: { id: nodeId } },
    });
    if (!content) throw new NotFoundException('Content not found');

    const cacheKey = `content:${nodeId}`;
    await this.redisService.del(cacheKey);

    return await this.contentRepository.remove(content);
  }

  async getContentByNodeId(nodeId: string) {
    const content = await this.contentRepository.findOne({
      where: { node: { id: nodeId } },
    });
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async getContentById(contentId: string) {
    const content = await this.contentRepository.findOne({
      where: { id: contentId },
    });
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async getAllContentVersion(id: string) {

    const content = await this.getContentById(id);
    const contentVersion = await this.contentVersionRepository.find({
      where: { content: {id} },
      select: ['id', 'message', 'createdAt', 'updatedAt'],
      order: {
        createdAt: 'DESC',
      },
    });

    console.log("content version", contentVersion)

    if (!contentVersion)
      throw new NotFoundException('Content version not found');

    return contentVersion;
  }
}
