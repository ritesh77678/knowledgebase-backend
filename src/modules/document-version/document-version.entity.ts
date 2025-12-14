import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "../document/document.entity";

@Entity()
export class DocumentVersion {
 
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Document, (document) => document.documentVersions)
    document: Document

    @Column({type: "int"})
    version: number

    @Column({type: "boolean", default: false})
    isPublished: boolean

    @Column()
    title: string

    @Column()
    description: string
    
    @Column({type: "json"})
    snapShort: JSON

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
}