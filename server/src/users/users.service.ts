import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const check_user = await this.userRepository.exists({ where: { email: createUserDto.email } })
      if (check_user) {
        return { success:false, message:"Trùng địa chỉ email" };
      }
      else {
        const salt = genSaltSync(10);
        const hash = hashSync(createUserDto.password, salt);
        createUserDto.password = hash
        await this.userRepository.save(createUserDto);
        return {success:true,message:'Tạo tài khoản thành công'}
      }
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: number) {
    const user = await this.userRepository.findOneBy({id})
    if(user)
      {
        user.role = Role.Admin
        await this.userRepository.update(id,user)
      }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email_get: string) {
    return await this.userRepository.findOneBy({ email:email_get });
  }

  async updateUserToken(token:string,id:number)
  {
    const existingUser = await this.userRepository.findOneBy({ id });
     existingUser.refresh_token = token
     await this.userRepository.save(existingUser)
  }

  findUserByToken = async(token:string)=>
    {
      return await this.userRepository.findOneBy({ refresh_token:token });

    }

    isValidPassword(password: string, hash: string) {
      return compareSync(password, hash);
    }
}
export enum Role {
  User = "user",
  Admin = "admin",
}