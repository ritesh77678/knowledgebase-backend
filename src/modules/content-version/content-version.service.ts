import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from './content-version.entity';
import { ContentService } from '../content/content.service';

@Injectable()
export class ContentVersionService {
  
  constructor(
    @InjectRepository(ContentVersion) private readonly contentVersionRepository: Repository<ContentVersion>,
  ) {}

  async getContentVersion(id: string){
    const contentVersion = await this.contentVersionRepository.findOne({
      where: { id },
    });
    if (!contentVersion) throw new NotFoundException('Content version not found');
    return contentVersion
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
