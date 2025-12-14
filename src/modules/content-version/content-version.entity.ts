import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "../content/content.entity";

@Entity()
export class ContentVersion {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Content, (content) => content.contentVersions)
    content: Content

    @Column({type: "json"})
    snapShort: JSON

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
}