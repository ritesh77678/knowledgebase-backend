import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
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

    @Column({type: "enum", enum: ['draft', 'private', 'deleted', 'published'], default: "draft"})
    status: 'draft' | 'private' | 'deleted' | 'published'
    
    @OneToMany(() => Node, (node) => node.document)
    nodes: Node[]

    @OneToMany(() => DocumentVersion, (documentVersion) => documentVersion.document)
    documentVersions: DocumentVersion[]

    @OneToMany(() => Permission, (permission) => permission.document)
    permissions: Permission[]

    @ManyToOne(() => DocumentVersion, {nullable: true})
    @JoinColumn({name: "publishedVersionId"})
    publishedVersion: DocumentVersion

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date
}