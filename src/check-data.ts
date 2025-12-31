import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Document } from './modules/document/document.entity';
import { Node } from './modules/node/node.entity';
import { ContentVersion } from './modules/content-version/content-version.entity';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const documentRepo = dataSource.getRepository(Document);
  const nodeRepo = dataSource.getRepository(Node);
  const cvRepo = dataSource.getRepository(ContentVersion);

  const docCount = await documentRepo.count();
  const nodeCount = await nodeRepo.count();
  const cvCount = await cvRepo.count();

  console.log('--- Database Stats ---');
  console.log(`Total Documents: ${docCount}`);
  console.log(`Total Nodes: ${nodeCount}`);
  console.log(`Total Content Versions: ${cvCount}`);

  const communities = await documentRepo
    .createQueryBuilder('doc')
    .select('doc.communityId', 'communityId')
    .addSelect('COUNT(doc.id)', 'count')
    .groupBy('doc.communityId')
    .getRawMany();

  console.log('\n--- Documents per Community ---');
  communities.forEach((c) => {
    console.log(`Community ${c.communityId}: ${c.count} docs`);
  });

  const statuses = await documentRepo
    .createQueryBuilder('doc')
    .select('doc.status', 'status')
    .addSelect('COUNT(doc.id)', 'count')
    .groupBy('doc.status')
    .getRawMany();

  console.log('\n--- Documents per Status ---');
  statuses.forEach((s) => {
    console.log(`Status ${s.status}: ${s.count}`);
  });

  await app.close();
}

bootstrap();
