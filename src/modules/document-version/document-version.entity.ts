import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Document } from "../document/document.entity";
import { Node } from "../node/node.entity";
import { DocumentVersionNodes } from "../document-version-nodes/document-version-nodes.entity";

@Entity()
@Unique(["document", "version"])
export class DocumentVersion {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Document, (document) => document.documentVersions, {onDelete: "CASCADE"})
    document: Document

    @Column({nullable: true})
    version: string

    @OneToMany(() => DocumentVersionNodes, (documentVersionNodes) => documentVersionNodes.documentVersion)
    documentVersionNodes: DocumentVersionNodes[]

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
}