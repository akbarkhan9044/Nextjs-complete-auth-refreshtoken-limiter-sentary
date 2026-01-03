import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis=Redis.fromEnv();

export const ratelimit=new Ratelimit({
    redis:redis,
    limiter:Ratelimit.slidingWindow(100,    "10s"),
    prefix:"@upstash/ratelimit",
    analytics:true

})