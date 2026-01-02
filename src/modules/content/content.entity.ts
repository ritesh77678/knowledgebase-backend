import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Node } from "../node/node.entity";
import { ContentVersion } from "../content-version/content-version.entity";

@Entity()
export class Content {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Node, (node) => node.content, {onDelete: "CASCADE"})
    @JoinColumn({name: "node_id"})
    node: Node

    // @Column({type: "jsonb", default: []})
    // content: any

    @OneToMany(() => ContentVersion, (contentVersion) => contentVersion.content)
    contentVersions: ContentVersion[]

    @OneToOne(() => ContentVersion, {onDelete: "CASCADE"})
    @JoinColumn({name: "publishedContent"})
    publishedVersion: ContentVersion

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}