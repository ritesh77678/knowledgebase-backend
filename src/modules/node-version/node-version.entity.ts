import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Node } from "../node/node.entity";

@Entity()
export class NodeVersion {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({type: "json"})
    snapShort: JSON

    @Column()
    version: string

    @ManyToOne(() => Node, (node) => node.nodeVersions)
    node: Node

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
}