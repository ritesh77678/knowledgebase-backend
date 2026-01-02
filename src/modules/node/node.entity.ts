import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Content } from "../content/content.entity";
import { DocumentVersionNodes } from "../document-version-nodes/document-version-nodes.entity";
import { Document } from "../document/document.entity";

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

    @OneToOne(() => Content, (content) => content.node, {cascade: true, nullable: true})
    @JoinColumn({name: "content_id"})
    content: Content

    @OneToMany(() => DocumentVersionNodes, (documentVersionNodes) => documentVersionNodes.node)
    documentVersionNodes: DocumentVersionNodes[]

    @ManyToOne(() => Document, (document) => document.nodes, {onDelete: "CASCADE"})
    document: Document

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}