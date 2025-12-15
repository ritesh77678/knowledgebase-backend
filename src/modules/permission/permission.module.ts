import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { DocumentModule } from "../document/document.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Permission
        ]),
        DocumentModule
    ],
    controllers: [PermissionController],
    providers: [PermissionService]
})
export class PermissionModule {}