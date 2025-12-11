import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentDto } from './dto/document.dto';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    create(@Body() createDocumentDto: DocumentDto) {
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
