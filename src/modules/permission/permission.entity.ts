import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "../document/document.entity";

@Entity()
export class Permission {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    spaceId: string

    @Column()
    userId: string

    // @ManyToOne(() => Document, (document) => document.permissions)
    // document: Document

    @Column({type: "enum", enum: ['read', 'write', 'admin']})
    role: 'read' | 'write' | 'admin'
}