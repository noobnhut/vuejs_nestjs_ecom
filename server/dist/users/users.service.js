"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.findUserByToken = async (token) => {
            return await this.userRepository.findOneBy({ refresh_token: token });
        };
    }
    async create(createUserDto) {
        try {
            const check_user = await this.userRepository.exists({ where: { email: createUserDto.email } });
            if (check_user) {
                return { success: false, message: "Trùng địa chỉ email" };
            }
            else {
                const saltOrRounds = 10;
                const password = createUserDto.password;
                const hash = await bcrypt.hash(password, saltOrRounds);
                createUserDto.password = hash;
                await this.userRepository.save(createUserDto);
                return { success: true, message: 'Tạo tài khoản thành công' };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOneBy({ id });
    }
    async update(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            user.role = Role.Admin;
            await this.userRepository.update(id, user);
        }
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findByEmail(email_get) {
        return await this.userRepository.findOneBy({ email: email_get });
    }
    async updateUserToken(token, id) {
        const existingUser = await this.userRepository.findOneBy({ id });
        existingUser.refresh_token = token;
        await this.userRepository.save(existingUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role || (exports.Role = Role = {}));
//# sourceMappingURL=users.service.js.map