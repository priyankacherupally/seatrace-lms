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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    config;
    constructor(config) {
        this.config = config;
    }
    login(dto) {
        const validUser = this.config.get('STATIC_USERNAME', 'admin');
        const validPass = this.config.get('STATIC_PASSWORD', 'admin@123');
        if (dto.username !== validUser || dto.password !== validPass) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const user = {
            id: '1',
            username: validUser,
            name: 'Admin',
            role: 'admin',
        };
        const payload = {
            sub: user.id,
            username: user.username,
            iat: Date.now(),
        };
        const token = Buffer.from(JSON.stringify(payload)).toString('base64');
        return { token, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map