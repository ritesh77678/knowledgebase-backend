import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Node } from "../node/node.entity";
import { DocumentVersion } from "../document-version/document-version.entity";
import { Permission } from "../permission/permission.entity";

export enum DocumentStatus {
    DRAFT = 'draft',
    PRIVATE = 'private',
    DELETED = 'deleted',
    PUBLISHED = 'published'
}

@Entity()
@Unique(["title", "communityId"])
@Index(['authorId'])
@Index(['communityId'])
@Index(['status'])
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
    @Index()
    communityId: string

    @Column({
        type: "enum", 
        enum: DocumentStatus, 
        default: DocumentStatus.DRAFT
    })
    status: DocumentStatus

    @OneToMany(() => Node, (node) => node.document)
    nodes: Node[]

    @OneToMany(() => DocumentVersion, (documentVersion) => documentVersion.document)
    documentVersions: DocumentVersion[]

    @OneToMany(() => Permission, (permission) => permission.document)
    permissions: Permission[]

    @ManyToOne(() => DocumentVersion, {nullable: true})
    @JoinColumn({name: "publishedVersionId"})
    publishedVersion: DocumentVersion

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    isAccessible(): boolean {
        return this.status !== DocumentStatus.DELETED
    }
}