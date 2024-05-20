import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    update(id: number): Promise<void>;
    remove(id: number): string;
}
