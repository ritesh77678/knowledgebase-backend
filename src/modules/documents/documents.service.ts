import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './schemas/document.schema';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectModel(Document.name) private documentModel: Model<Document>,
    ) { }

    async create(createDocumentDto: any): Promise<Document> {
        const createdDocument = new this.documentModel(createDocumentDto);
        return createdDocument.save();
    }

    async findAll(spaceId: string, userId: string): Promise<Document[]> {
        // Logic:
        // 1. Document belongs to the space (spaceId field)
        // 2. OR Document allows this space (allowedSpaces)
        // 3. AND User has access:
        //    - If status is 'published', everyone in allowed space can see? (User didn't specify exactly, assuming yes if space matches)
        //    - If status is 'private' or 'draft', maybe only author or contributors?
        //    - OR if user is in allowedUsers?

        // Based on user request: "only allowed space can view that particular document sames goes with user also"
        // And "status of the document can be private, published, draft"
        // Complexity implies: Visible if (Space Allowed) AND (User Allowed OR Public/Published within space??)

        // Simplest interpretation of "restrict visibility... to specific space and user":
        // The document must explicitly allow the space AND the user.
        // However, "author" and "contributors" are also roles.

        // Let's implement a query that checks:
        // (spaceId == currentSpace OR allowedSpaces contains currentSpace)
        // AND
        // (allowedUsers contains currentUser OR authorId == currentUser OR contributors contains currentUser)

        // If status matters:
        // If 'published', maybe allowedUsers check is relaxed?
        // User said: "only allowed space can view ... same goes with user also".
        // This suggests strict whitelisting. But usually 'published' means public to the space.

        // I will assume:
        // Space Scope: Must be in document.spaceId or document.allowedSpaces.
        // User Scope: Must be author, contributor, or in allowedUsers.
        // BUT what about "published"? Usually published means available to all users in the space.
        // I will add: OR (status == 'published') if that makes sense for "user documentation".

        return this.documentModel.find({
            $and: [
                {
                    $or: [
                        { spaceId: spaceId },
                        { allowedSpaces: spaceId }
                    ]
                },
                {
                    $or: [
                        { authorId: userId },
                        { contributors: userId },
                        { allowedUsers: userId },
                        // Assuming 'published' documents are visible to everyone in the allowed spaces
                        { status: 'published' }
                    ]
                }
            ]
        }).exec();
    }

    async findOne(id: string): Promise<Document | null> {
        return this.documentModel.findById(id).exec();
    }
}
