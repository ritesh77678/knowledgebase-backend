import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Document } from './modules/document/document.entity';
import { Node } from './modules/node/node.entity';
import { Content } from './modules/content/content.entity';
import { ContentVersion } from './modules/content-version/content-version.entity';
import { DocumentVersion } from './modules/document-version/document-version.entity';
import { Permission } from './modules/permission/permission.entity';
import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import { DocumentStatus } from './modules/document-version/document-version.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const documentRepo = dataSource.getRepository(Document);
  const nodeRepo = dataSource.getRepository(Node);
  const contentRepo = dataSource.getRepository(Content);
  const contentVersionRepo = dataSource.getRepository(ContentVersion);
  const documentVersionRepo = dataSource.getRepository(DocumentVersion);
  const permissionRepo = dataSource.getRepository(Permission);

  console.log('Starting mass data seeding...');

  // 1. Define Communities
  const communities = [
    { id: randomUUID(), name: 'Engineering' },
    { id: randomUUID(), name: 'Product' },
    { id: randomUUID(), name: 'Sales' },
  ];

  console.log('Communities:', communities);

  // Helper to generate BlockNote content
  const generateContent = (title: string, text: string, version: number) => {
    return [
      {
        id: randomUUID(),
        type: 'heading',
        props: {
          textColor: 'default',
          backgroundColor: 'default',
          textAlignment: 'left',
          level: 1,
        },
        content: [{ type: 'text', text: `${title} (v${version})`, styles: {} }],
        children: [],
      },
      {
        id: randomUUID(),
        type: 'paragraph',
        props: {
          textColor: 'default',
          backgroundColor: 'default',
          textAlignment: 'left',
        },
        content: [
          {
            type: 'text',
            text: `${text} This is content version ${version}.`,
            styles: {},
          },
        ],
        children: [],
      },
    ];
  };

  const createVersionedContent = async (
    node: Node,
    title: string,
    description: string,
  ) => {
    // 1. Create Content Container
    const content = new Content();
    content.node = node;
    const savedContent = await contentRepo.save(content);

    // 2. Create 5 Versions
    const versions: ContentVersion[] = [];
    for (let v = 1; v <= 5; v++) {
      const cv = new ContentVersion();
      cv.content = savedContent;
      cv.snapShot = generateContent(title, description, v);
      cv.message = `Auto-save checkpoint ${v}`;
      const savedCv = await contentVersionRepo.save(cv);
      versions.push(savedCv);
    }

    // 3. Set Published Version (Latest)
    // savedContent.publishedVersion = versions[versions.length - 1];
    await contentRepo.save(savedContent);
  };

  // 2. Create Documents for each Community
  for (const community of communities) {
    console.log(
      `Seeding data for Community: ${community.name} (${community.id})`,
    );

    const statuses = Object.values(DocumentStatus); // ['draft', 'private', 'deleted', 'published']

    for (let i = 1; i <= 20; i++) {
      const status = statuses[(i - 1) % statuses.length];
      const doc = new Document();
      // doc.title = `${community.name} Doc ${i} - ${status.toUpperCase()} (${new Date().getTime()})`;
      doc.description = `A ${status} document for ${community.name} community.`;
      doc.authorId = randomUUID(); // Random author
      doc.communityId = community.id;
      // doc.status = status;

      const savedDoc = await documentRepo.save(doc);

      // Create Permission for Author
      const permission = new Permission();
      // permission.document = savedDoc;
      permission.userId = savedDoc.authorId;
      permission.spaceId = community.id;
      permission.role = 'admin';
      await permissionRepo.save(permission);

      // Create Document Version if PUBLISHED
      if (status === DocumentStatus.PRIVATE) {
        const docVersion = new DocumentVersion();
        docVersion.document = savedDoc;
        docVersion.version = 'v1.0'; // Initial published version
        // docVersion.title = savedDoc.title;
        // docVersion.description = savedDoc.description;
        // docVersion.snapShot = { meta: 'Initial seed snapshot' };

        const savedDocVersion = await documentVersionRepo.save(docVersion);

        savedDoc.publishedVersion = savedDocVersion;
        await documentRepo.save(savedDoc);
      }

      // 3. Create Structure (Reduced structure to keep seed time reasonable: 2 Chapters -> 1 Sub -> 1 Page)
      // Total nodes per doc: 2 Chapters + 2 Subs + 2 Pages = 6 nodes.
      // 6 nodes * 5 versions = 30 versions per doc.
      // 60 docs total * 30 versions = 1800 writes. Reasonable.

      for (let c = 1; c <= 2; c++) {
        const chapter = new Node();
        chapter.title = `Chapter ${c}`;
        chapter.type = 'chapter';
        chapter.orderIndex = c;
        // chapter.document = savedDoc;
        chapter.authorId = savedDoc.authorId;
        const savedChapter = await nodeRepo.save(chapter);
        await createVersionedContent(
          savedChapter,
          `Chapter ${c}`,
          `Chapter content`,
        );

        for (let s = 1; s <= 1; s++) {
          const sub = new Node();
          sub.title = `Sub ${c}.${s}`;
          sub.type = 'subchapter';
          sub.orderIndex = s;
          // sub.document = savedDoc;
          sub.parent = savedChapter;
          sub.authorId = savedDoc.authorId;
          const savedSub = await nodeRepo.save(sub);
          await createVersionedContent(
            savedSub,
            `Sub ${c}.${s}`,
            `Subchapter content`,
          );

          for (let p = 1; p <= 1; p++) {
            const page = new Node();
            page.title = `Page ${c}.${s}.${p}`;
            page.type = 'page';
            page.orderIndex = p;
            // page.document = savedDoc;
            page.parent = savedSub;
            page.authorId = savedDoc.authorId;
            const savedPage = await nodeRepo.save(page);
            await createVersionedContent(
              savedPage,
              `Page ${c}.${s}.${p}`,
              `Page content`,
            );
          }
        }
      }
    }
  }

  console.log('Mass seeding complete!');
  await app.close();
}

bootstrap();
