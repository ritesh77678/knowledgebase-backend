import { Injectable } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";
import { ContentVersionDto } from "../content-version/dto/content-version.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AutoSaveService {

    constructor(
        private readonly redisService: RedisService
    ){}

    async enqueueAutoSave(payload: ContentVersionDto){

        const versionId = uuidv4()
        const cacheKey = `autosave:cache:${payload.contentId}`
        const streamKey = `autosave:stream`

        const updatedPayload: ContentVersionDto & {id: string} = {
            ...payload,
            id: versionId
        }

        const payloadInString = JSON.stringify(updatedPayload)

        this.redisService.set(cacheKey, payloadInString)
        this.redisService.xadd(
            streamKey,
            payloadInString
        )

        return {
            id: versionId,
            message: "Autosave enqueued successfully",
        }
    }
}