import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const hashPass = hashSync(password, 10);
    return hashPass;
  };

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPass = this.getHashPassword(createUserDto.password);
      createUserDto.password = hashPass;
      const createdUser = await this.UserModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      return { status: 'Failed to create a new user', error: error };
    }
  }

  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) return 'Not found user!';
    return await this.UserModel.findById(id);
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      if (!mongoose.isValidObjectId(updateUserDto._id))
        return 'Not found user!';
      const user = await this.UserModel.findByIdAndUpdate(
        updateUserDto._id,
        updateUserDto,
      );
      return user;
    } catch (error) {
      return { status: 'Failed to update user', error: error };
    }
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) return 'Not found user!';
    return await this.UserModel.findByIdAndDelete(id);
  }
}
