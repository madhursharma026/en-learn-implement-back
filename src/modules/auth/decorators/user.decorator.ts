import { Request } from 'express';
import { GqlContextType } from '@nestjs/graphql';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    let request: Request | any;

    if (ctx.getType() === 'http') {
      request = ctx.switchToHttp().getRequest();
    } else if (ctx.getType() === 'rpc') {
      request = ctx.switchToRpc().getData();
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
      request = ctx.getArgByIndex(2).req;
    }
    return request.user;
  },
);
