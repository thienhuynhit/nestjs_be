import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Khong dung dinh dang email!' })
  @IsNotEmpty({ message: 'email khong duoc bo trong!!' })
  email: string;

  @IsNotEmpty({ message: 'password khong duoc bo trong!!' })
  password: string;

  name: string;
  phone: string;
  address: string;
  age: number;
}
