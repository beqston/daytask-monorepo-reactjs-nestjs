import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title!:string

    @IsNotEmpty()
    @IsString()
    details!:string

    @IsNotEmpty()
    @IsString()
    time!:string

    @IsNotEmpty()
    @IsString()
    date!:string

    @IsString()
    subtask?:string

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    percentage?: number;

    @IsArray()
    @IsString({each:true})
    memberIds!:string[]
}
