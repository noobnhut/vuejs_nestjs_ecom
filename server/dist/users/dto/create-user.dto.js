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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email sai định dạng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ mail không được để trống' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.Length)(8, 20, { message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])/, { message: 'Mật khẩu phải chứa ít nhất một chữ thường' }),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])/, { message: 'Mật khẩu phải chứa ít nhất một chữ hoa' }),
    (0, class_validator_1.Matches)(/(?=.*\d)/, { message: 'Mật khẩu phải chứa ít nhất một chữ số' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ và tên không được để trống' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được để trống' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "numberphone", void 0);
//# sourceMappingURL=create-user.dto.js.map