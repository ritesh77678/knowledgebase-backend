import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Document } from "../document/document.entity";

@Entity()
@Unique(["document", "version"])
export class DocumentVersion {
 
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Document, (document) => document.documentVersions)
    document: Document

    @Column()
    version: string

    @Column()
    title: string

    @Column()
    description: string
    
    @Column({type: "jsonb"})
    snapShort: any

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
}