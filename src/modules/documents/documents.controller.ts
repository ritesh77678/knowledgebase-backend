import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    create(@Body() createDocumentDto: any) {
        return this.documentsService.create(createDocumentDto);
    }

    @Get()
    findAll(@Query('spaceId') spaceId: string, @Query('userId') userId: string) {
        return this.documentsService.findAll(spaceId, userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id);
    }
}
