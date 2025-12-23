import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from './content-version.entity';
import { ContentVersionDto } from './dto/content-version.dto';
import { ContentService } from '../content/content.service';

@Injectable()
export class ContentVersionService {
  constructor(
    @InjectRepository(ContentVersion)
    private readonly contentVersionRepository: Repository<ContentVersion>,
    private readonly contentService: ContentService,
  ) {}

  async createContentVersion(
    contentId: string,
    contentVersionDto: ContentVersionDto,
  ) {
    const content = await this.contentService.getContentById(contentId)

    const oldVersions = await this.contentVersionRepository
      .createQueryBuilder('cv')
      .where('cv.contentId = :contentId', { contentId })
      .orderBy('cv.createdAt', 'DESC')
      .offset(5)
      .getMany();

    if (oldVersions.length) {
      await this.contentVersionRepository.remove(oldVersions);
    }

    return content
  }

  async getContentVersionById(contentVersionId: string) {
    const contentVersion = await this.contentVersionRepository.findOne({
      where: { id: contentVersionId },
    });
    if (!contentVersion)
      throw new NotFoundException('Content version not found');
    return contentVersion;
  }

  async deleteContentVersionById(contentVersionId: string) {
    const contentVersion = await this.contentVersionRepository.findOne({
      where: { id: contentVersionId },
    });
    if (!contentVersion)
      throw new NotFoundException('Content version not found');
    return await this.contentVersionRepository.remove(contentVersion);
  }
}
