import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Content } from "../content/content.entity";

@Entity()
export class ContentVersion {
 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "jsonb"})
    snapShort: any

    @Column()
    version: string

    @ManyToOne(() => Content, (content) => content.contentVersions)
    content: Content

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}