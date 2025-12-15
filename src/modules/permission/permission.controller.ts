import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionDto } from "./dto/permission.dto";

@Controller("permission")
export class PermissionController {
 
    constructor(
        private readonly permissionService: PermissionService
    ){}

    @Post(":documentId")
    async upsertPermission(
        @Param("documentId") documentId: string,
        @Body() permissionDto: PermissionDto
    ){
        return await this.permissionService.upsertPermission(documentId, permissionDto)
    }

    @Delete(":id")
    async deletePermission(
        @Param("id") id: string
    ){
        return await this.permissionService.deletePermission(id)
    }

}