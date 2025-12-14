import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Node } from "../node/node.entity";
import { DocumentVersion } from "../document-version/document-version.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
@Unique(["title", "communityId"])
export class Document {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string

    @Column()
    description: string
    
    @Column()
    authorId: string

    @Column()
    communityId: string

    @Column({type: "enum", enum: ['draft', 'private', 'deleted'], default: "draft"})
    status: 'draft' | 'private' | 'deleted'
    
    @OneToMany(() => Node, (node) => node.document)
    nodes: Node[]

    @OneToMany(() => DocumentVersion, (documentVersion) => documentVersion.document)
    documentVersions: DocumentVersion[]

    @OneToMany(() => Permission, (permission) => permission.document)
    permissions: Permission[]

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date
}