import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubchaptersService } from './subchapters.service';

@Controller('subchapters')
export class SubchaptersController {
    constructor(private readonly subchaptersService: SubchaptersService) { }

    @Post()
    create(@Body() createSubchapterDto: any) {
        return this.subchaptersService.create(createSubchapterDto);
    }

    @Get('chapter/:chapterId')
    findAllByChapter(@Param('chapterId') chapterId: string) {
        return this.subchaptersService.findAllByChapter(chapterId);
    }
}
