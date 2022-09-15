/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:04
 */
import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
  secret: 'secretKey',
};

export const IS_PUBLIC_KEY = 'is_public'

// 跳过验证，用于不需要验证 jwt 的模块当中
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true)
