import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ContentVersion } from "../content-version/content-version.entity";
import { Node } from "../node/node.entity";

@Entity()
@Unique(["node"])
export class Content {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "json"})
    content: JSON

    @OneToOne(() => Node, (node) => node.content)
    @JoinColumn({name: "node_id"})
    node: Node

    @OneToMany(() => ContentVersion, (contentVersion) => contentVersion.content)
    contentVersions: ContentVersion[]

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date
}