import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Document } from "../document/document.entity";
import { NodeVersion } from "../node-version/node-version.entity";
import { Content } from "../content/content.entity";

@Entity()
@Unique(["title", "parent", "document"])
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
    orderIndex: string

    @ManyToOne(() => Node, (node) => node.children, {nullable: true})
    parent: Node

    @OneToMany(() => Node, (node) => node.parent, {onDelete: "CASCADE"})
    children: Node[]

    @OneToOne(() => Content, (content) => content.node)
    content: Content

    @ManyToOne(() => Document, (document) => document.nodes, {onDelete: "CASCADE"})
    document: Document

    @OneToMany(() => NodeVersion, (nodeVersion) => nodeVersion.node)
    nodeVersions: NodeVersion[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
}