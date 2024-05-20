import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number): Promise<void>;
    remove(id: number): string;
    findByEmail(email_get: string): Promise<User>;
    updateUserToken(token: string, id: number): Promise<void>;
    findUserByToken: (token: string) => Promise<User>;
}
export declare enum Role {
    User = "user",
    Admin = "admin"
}
