import { IsEnum, IsOptional, IsString } from "class-validator";

export class PermissionDto {

    @IsString()
    @IsOptional()
    spaceId: string

    @IsString()
    @IsOptional()
    userId: string

    @IsEnum(['read', 'write', 'admin'])
    role: 'read' | 'write' | 'admin'
}