import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { Repository } from "typeorm";
import { PermissionDto } from "./dto/permission.dto";
import { DocumentService } from "../document/document.service";

@Injectable()
export class PermissionService {

    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        private readonly documentService: DocumentService
    ) {}

    // async createPermission(documentId: string, permissionDto: PermissionDto){

    //     const document = await this.documentService.getDocumentById(documentId)
    //     const permission = this.permissionRepository.create({
    //         ...permissionDto,
    //         document
    //     })
    //     return await this.permissionRepository.save(permission)
    // }

    async upsertPermission(documentId: string, permissionDto: PermissionDto){
        const document = await this.documentService.getDocumentById(documentId)
        const permission = await this.permissionRepository.upsert({
            ...permissionDto,
            // document
        }, {
            conflictPaths: ['documentId', 'userId', 'role'],
            skipUpdateIfNoValuesChanged: true
        })
        return permission
    }

    async deletePermission(id: string){
        const permission = await this.permissionRepository.findOne({where: {id}})
        if (!permission) throw new NotFoundException("Permission not found")

        return await this.permissionRepository.remove(permission)
    }
}