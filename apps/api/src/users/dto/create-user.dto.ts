import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "FullName is required!" })
  @IsString()
  @Matches(/^(?=.*\s)[a-zA-Z\s]{3,}$/, {
    message: "FullName must contain only Latin letters and at least one space!",
  })
  fullName!: string;

  @IsNotEmpty({ message: "Email is required!" })
  @IsEmail({}, { message: "Please Enter valid email!" })
  email!: string;

  @IsNotEmpty({ message: "Password is required!" })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
    }
  )
  password!: string;
}