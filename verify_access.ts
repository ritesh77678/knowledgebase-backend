import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DocumentsService } from './src/documents/documents.service';
import { ChaptersService } from './src/chapters/chapters.service';
import { SubchaptersService } from './src/subchapters/subchapters.service';
import { PagesService } from './src/pages/pages.service';

async function bootstrap() {
    try {
        const app = await NestFactory.createApplicationContext(AppModule);

        const docsService = app.get(DocumentsService);
        const chaptersService = app.get(ChaptersService);
        const subchaptersService = app.get(SubchaptersService);
        const pagesService = app.get(PagesService);

        console.log('--- START VERIFICATION ---');

        // 1. Create a Document
        const doc: any = await docsService.create({
            title: 'Test Doc',
            spaceId: 'space1',
            authorId: 'user1',
            status: 'private',
            allowedSpaces: ['space1'],
            allowedUsers: ['user1'],
        });
        console.log('Created Document:', doc._id);

        // 2. Verify Access Control
        const visibleToAuthor = await docsService.findAll('space1', 'user1');
        console.log('Visible to Author (Should be 1):', visibleToAuthor.length);

        const visibleToOther = await docsService.findAll('space1', 'user2');
        console.log('Visible to Other (Should be 0):', visibleToOther.length);

        // 3. Add Contributor
        doc.contributors.push('user2');
        await doc.save();
        const visibleToContributor = await docsService.findAll('space1', 'user2');
        console.log('Visible to Contributor (Should be 1):', visibleToContributor.length);

        // 4. Create Hierarchy
        const chapter: any = await chaptersService.create({
            title: 'Chapter 1',
            documentId: doc._id,
        });
        console.log('Created Chapter:', chapter._id);

        const subchapter: any = await subchaptersService.create({
            title: 'Subchapter 1.1',
            chapterId: chapter._id,
        });
        console.log('Created Subchapter:', subchapter._id);

        const page: any = await pagesService.create({
            title: 'Page 1.1.1',
            content: { text: 'Hello World' },
            parentId: subchapter._id,
            parentType: 'Subchapter',
        });
        console.log('Created Page:', page._id);

        console.log('--- VERIFICATION COMPLETE ---');
        await app.close();
    } catch (error) {
        console.error('VERIFICATION ERROR:', error);
        process.exit(1);
    }
}

bootstrap();
