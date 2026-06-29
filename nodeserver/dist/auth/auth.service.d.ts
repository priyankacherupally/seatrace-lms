import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly config;
    constructor(config: ConfigService);
    login(dto: LoginDto): {
        token: string;
        user: {
            id: string;
            username: string;
            name: string;
            role: string;
        };
    };
}
