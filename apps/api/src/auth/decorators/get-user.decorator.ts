import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestUserType } from "src/types/request-user";

export const GetUser = createParamDecorator(
    (data:keyof RequestUserType | undefined, ctx:ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        return data? user?.[data]:user
    }
)