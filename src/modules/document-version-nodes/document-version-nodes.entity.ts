import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentVersion } from "../document-version/document-version.entity";
import { NodeVersion } from "../node-version/node-version.entity";

@Entity()
export class DocumentVersionNodes {
 
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => DocumentVersion, (documentVersion) => documentVersion.documentVersionNodes)
    documentVersion: DocumentVersion

    @ManyToOne(() => NodeVersion, (nodeVersion) => nodeVersion.documentVersionNodes)
    nodeVersions: NodeVersion
}