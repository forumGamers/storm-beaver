import { Injectable } from "@nestjs/common";
import { CacheService } from "../../cache/cache.service";
import { UserService } from "../user/user.service";

@Injectable()
export class PostService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService
  ) {}

  public async getTimeline() {}
}
