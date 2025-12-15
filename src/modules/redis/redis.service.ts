import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
    private readonly client: Redis;
    constructor(){
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
            db: Number(process.env.REDIS_DB)
        })

        this.client.on("connect", () => {
            console.log("Redis connected")
        })

        this.client.on("error", (error) => {
            console.log("Redis error", error)
        })
    }

    async get(key: string){
        return await this.client.get(key)
    }

    async set(key: string, content: string, ttl: number = 60 * 60){
        return this.client.set(key, content, "EX", ttl)
    }

    async del(key: string){
        return this.client.del(key)
    }

    async xadd(cacheKey: string, payload: string){
        return this.client.xadd(
            cacheKey,
            "*",
            "payload",
            payload,
            "ts",
            Date.now().toString()
        )
    }

    async getClient(){
        return this.client
    }
}