import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"FullName is required!"})
    @IsString()
    fullName!:string;
    
    @IsNotEmpty({message:"Email is required!"})
    @IsEmail({}, {message:"Please Enter valid email!"})
    email!:string;
    
    @IsNotEmpty({message:"Password is required!"})
    @IsString()
    @MinLength(8)
    password!:string;
}
