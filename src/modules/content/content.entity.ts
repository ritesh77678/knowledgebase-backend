import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Node } from "../node/node.entity";
import { ContentVersion } from "../content-version/content-version.entity";

@Entity()
export class Content {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Node, (node) => node.content, {onDelete: "CASCADE"})
    node: Node

    @OneToMany(() => ContentVersion, (contentVersion) => contentVersion.content)
    contentVersions: ContentVersion[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}