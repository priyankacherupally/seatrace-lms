import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
