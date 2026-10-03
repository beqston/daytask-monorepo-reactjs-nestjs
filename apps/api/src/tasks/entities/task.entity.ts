import { IsNotEmpty, IsString } from "class-validator"

export class Task {
        @IsNotEmpty()
        @IsString()
        title!:String
    
        @IsNotEmpty()
        @IsString()
        details!:String
    
        @IsNotEmpty()
        @IsString()
        percentage!:String
    
        @IsNotEmpty()
        @IsString()
        time!:String
    
        @IsNotEmpty()
        @IsString()
        date!:String
    
        @IsString()
        subtask?:String
}
