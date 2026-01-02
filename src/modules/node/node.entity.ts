import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Document } from "../document/document.entity";
import { Content } from "../content/content.entity";
import { DocumentVersion } from "../document-version/document-version.entity";
import { NodeVersion } from "../node-version/node-version.entity";

@Entity()
export class Node {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({ type: "enum", enum: ['chapter', 'subchapter', 'page'] })
    type: 'chapter' | 'subchapter' | 'page'

    @Column({nullable: true})
    authorId: string

    @Column()
    orderIndex: number

    @ManyToOne(() => Node, (node) => node.children, {nullable: true, onDelete: "CASCADE"})
    parent: Node

    @OneToMany(() => Node, (node) => node.parent)
    children: Node[]

    // @ManyToOne(() => DocumentVersion, (documentVersion) => documentVersion.nodes)
    // documentVersion: DocumentVersion

    @OneToMany(() => NodeVersion, (nodeVersion) => nodeVersion.node)
    nodeVersions: NodeVersion[]

    @OneToOne(() => Content, (content) => content.node, {cascade: true, nullable: true})
    content: Content

    @ManyToOne(() => Document, (document) => document.nodes, {onDelete: "CASCADE"})
    document: Document

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}