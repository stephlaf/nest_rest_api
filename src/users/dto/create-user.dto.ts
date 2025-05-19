import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['intern', 'engineer', 'admin'], {
    message: "Valid role required 'intern'|'engineer'|'admin'"
  })
  role: 'intern' | 'engineer' | 'admin';
}
