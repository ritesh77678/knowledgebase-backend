import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { DocumentVersion } from "../document-version/document-version.entity";
import { Node } from "../node/node.entity";


@Entity()
@Unique(["title", "communityId"])
export class Document {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string

    @Column()
    description: string
    
    @Column({nullable: true})
    authorId: string

    @Column()
    @Index()
    communityId: string

    @OneToMany(() => DocumentVersion, (documentVersion) => documentVersion.document)
    documentVersions: DocumentVersion[]

    @OneToOne(() => DocumentVersion, (documentVersion) => documentVersion.document)
    @JoinColumn({name: "publishedVersionId"})
    publishedVersion: DocumentVersion

    @OneToOne(() => DocumentVersion, (documentVersion) => documentVersion.document, {nullable: true})
    @JoinColumn({name: "draftVersionId"})
    draftVersion: DocumentVersion

    @OneToMany(() => Node, (node) => node.document)
    nodes: Node[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deleteAt: Date
}