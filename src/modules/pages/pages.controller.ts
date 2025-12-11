import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Post()
    create(@Body() createPageDto: any) {
        return this.pagesService.create(createPageDto);
    }

    @Get('parent/:parentId')
    findAllByParent(@Param('parentId') parentId: string) {
        return this.pagesService.findAllByParent(parentId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pagesService.findOne(id);
    }
}
