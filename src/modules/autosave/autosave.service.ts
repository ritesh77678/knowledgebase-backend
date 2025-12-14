import { Injectable } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class AutoSaveService {

    constructor(
        private readonly redisService: RedisService
    ){}

    async enqueueAutoSave(nodeId: string, payload: string){
        (await this.redisService.getClient()).xadd(
            `autosave:${nodeId}`,
            "*",
            "payload",
            payload, 
            "ts",
            Date.now().toString()
        )
    }
}