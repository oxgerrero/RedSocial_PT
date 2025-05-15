"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const auth_routes_1 = require("./routes/auth.routes");
const post_routes_1 = require("./routes/post.routes");
const user_routes_1 = require("./routes/user.routes");
const dev_routes_1 = require("./routes/dev.routes");
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'], // ⚡ cambiar en producción
    credentials: true,
}));
app.use(express_1.default.json());
// Swagger Docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Routes
app.use('/api/auth', auth_routes_1.authRouter);
app.use('/api/posts', post_routes_1.postRouter);
app.use('/api/users', user_routes_1.userRouter);
//otros services
app.use('/api/dev', dev_routes_1.devRouter);
//Limites de peticiones
app.use('/api/auth/login', rateLimit_middleware_1.authLimiter);
app.use('/api/auth/register', rateLimit_middleware_1.authLimiter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
