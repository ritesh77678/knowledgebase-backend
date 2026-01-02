import { Column, CreateDateColumn, Entity, ManyToOne, NumericType, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Node } from "../node/node.entity";
import { DocumentVersion } from "../document-version/document-version.entity";
import { DocumentVersionNodes } from "../document-version-nodes/document-version-nodes.entity";

@Entity()
export class NodeVersion {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({type: "enum", enum: ['chapter', 'subchapter', 'page']})
    type: 'chapter' | 'subchapter' | 'page'

    @Column()
    orderIndex: number

    @ManyToOne(() => NodeVersion, (nodeVersion) => nodeVersion.parent)
    parent: NodeVersion

    @OneToMany(() => NodeVersion, (nodeVersion) => nodeVersion.parent)
    children: NodeVersion[]

    @Column({type: "jsonb"})
    content: JSON

    // @ManyToOne(() => Node, (node) => node.nodeVersions)
    // node: Node

    // @OneToMany(() => DocumentVersionNodes, dvn => dvn.nodeVersions)
    // documentVersionNodes: DocumentVersionNodes[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}