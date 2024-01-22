import { Injectable } from "@nestjs/common";
import { CacheService } from "../../cache/cache.service";

@Injectable()
export class PostService {
  constructor(private readonly cacheService: CacheService) {}
}
