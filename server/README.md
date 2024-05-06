1. nest new project
2. npm install --save @nestjs/typeorm typeorm mysql2
3. npm i dotenv
4. npm i --save @nestjs/config 

### Cấu hình dotenv trước
1. Tạo 1 file .env cùng cấp với src :
JWT_ACCESS_SECRET=JUSTARANDOMSECRET
JWT_ACCESS_EXPIRED_IN=60s
DB_DATABASE="ecom"
DB_HOST="localhost"
DB_PORT=3306
DB_USERNAME="root"
DB_PASSWORD=""
2. trong src/app.module.ts
* import { ConfigModule, ConfigService } from '@nestjs/config';
* trong imports:[
  ConfigModule.forRoot({
      isGlobal: true
    }),
]

### Cấu hình typeorm 
1. tạo 1 file src/typeorm.config.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 3306),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', ''),
          database: configService.get<string>('DB_DATABASE', 'ecom'),
          entities: [], // Thêm các entities của bạn vào đây
          synchronize: true, // Chỉ dùng trong môi trường dev
        }),
        inject: [ConfigService],
      }),
  ],
})
export class CustomTypeOrmModule {}
2. import lại vào src/app.module.ts
* import {CustomTypeOrmModule} from './typeorm.config'
* bỏ vào trong imports
3. Tạo entites ánh xạ csdl là xong goodluck !
4. Cấu hình service ... để code chuẩn ở các model table
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

5. DTO -> nơi này chứa giá trị để thao tác vs create
npm i class-validator
vào users/dto/create-user.dto.ts
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

6. tại user.module.ts
 imports:[TypeOrmModule.forFeature([User])], // khai báo để qli


 https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
 npm i --save-dev nodemon ts-node
 https://gist.github.com/sravan464/609a8c58e746d5391922c11f6a0b3381
 https://docs.nestjs.com/techniques/cookies