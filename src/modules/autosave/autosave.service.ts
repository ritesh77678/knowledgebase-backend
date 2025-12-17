import { Injectable } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class AutoSaveService {

    constructor(
        private readonly redisService: RedisService
    ){}

    async enqueueAutoSave(nodeId: string, payload: string){

        const cacheKey = `autosave:cache:${nodeId}`
        const streamKey = `autosave:stream`

        this.redisService.set(cacheKey, payload)
        this.redisService.xadd(
            streamKey,
            JSON.stringify({
                nodeId,
                payload
            })
        )
    }
}