x.entity.ts
import { UserRole } from "src/user_roles/entities/user_roles.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'categories'y }) // Tên table trên cơ sở dữ liệu
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, nullable: false, unique: true })
    name_cat: string;

    // @OneToMany(() => UserRole, (UserRole) => UserRole.user)
    // user_roles: UserRole[]
    
    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
x.serivce.ts

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
#### 
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

x.dto
import { IsEmail, IsNotEmpty } from 'class-validator';

//data transfer object // class = { }
export class CreateUserDto {
    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    name: string;
    address: string;
}


x.module.ts
 imports:[TypeOrmModule.forFeature([User])], // khai báo để qli