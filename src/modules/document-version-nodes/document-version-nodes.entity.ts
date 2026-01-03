import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { DocumentVersion } from "../document-version/document-version.entity";
import { Node } from "../node/node.entity";

@Entity()
@Unique(["node", "documentVersion"])
export class DocumentVersionNodes {
 
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => DocumentVersion, (documentVersion) => documentVersion.documentVersionNodes, {onDelete: 'CASCADE'})
    documentVersion: DocumentVersion

    @ManyToOne(() => Node, (node) => node.documentVersionNodes, {onDelete: 'CASCADE'})
    node: Node

    @Column({type: "jsonb", default: []})
    content: JSON

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
