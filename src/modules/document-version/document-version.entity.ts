import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Document } from "../document/document.entity";
import { DocumentVersionNodes } from "../document-version-nodes/document-version-nodes.entity";

export enum DocumentStatus {
    DRAFT = 'draft',
    PRIVATE = 'private',
    // DELETED = 'deleted',
    // PUBLISHED = 'published',
}

@Entity()
@Unique(["document", "version"])
export class DocumentVersion {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Document, (document) => document.documentVersions, {onDelete: "CASCADE"})
    document: Document

    @Column({nullable: true})
    version: string

    @Column({type: "enum", enum: DocumentStatus, default: DocumentStatus.DRAFT})
    status: DocumentStatus

    @OneToMany(() => DocumentVersionNodes, (documentVersionNodes) => documentVersionNodes.documentVersion)
    documentVersionNodes: DocumentVersionNodes[]

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @DeleteDateColumn()
    deleteAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}