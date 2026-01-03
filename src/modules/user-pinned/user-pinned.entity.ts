import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPinned {
 
    @PrimaryGeneratedColumn("uuid")
    id: string

    userId: string

    documentVersionId: string
}