import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChaptersService } from './chapters.service';

@Controller('chapters')
export class ChaptersController {
    constructor(private readonly chaptersService: ChaptersService) { }

    @Post()
    create(@Body() createChapterDto: any) {
        return this.chaptersService.create(createChapterDto);
    }

    @Get('document/:documentId')
    findAllByDocument(@Param('documentId') documentId: string) {
        return this.chaptersService.findAllByDocument(documentId);
    }
}
