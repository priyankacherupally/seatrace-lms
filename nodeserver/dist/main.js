"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const apiPrefix = config.get('API_PREFIX', 'api');
    const port = config.get('PORT', 3000);
    const corsOrigin = config.get('CORS_ORIGIN', 'http://localhost:5174');
    app.setGlobalPrefix(apiPrefix);
    app.enableCors({
        origin: corsOrigin.split(',').map((s) => s.trim()),
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(port);
    common_1.Logger.log(`🚀 Server running at http://localhost:${port}/${apiPrefix}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map