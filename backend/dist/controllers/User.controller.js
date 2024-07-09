"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.verifyEmail(req.body);
                result.status == "success" ? res.send(result)
                    : res.status(409).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.confirmRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const result = yield this.userService.create(token);
                result.status == "success" ? res.send(result)
                    : res.status(409).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.sendResetPasswordToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const result = yield this.userService.resetEmail(email);
                result.status == "success" ? res.send(result)
                    : res.status(400).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { password } = req.body;
            try {
                const result = yield this.userService.updatePassword({ token, password });
                result.status == "success" ? res.send(result)
                    : res.status(409).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { categoryId = null } = req.params;
            let page = typeof req.query.page === 'string' ? req.query.page : null;
            if (page && isNaN(+page)) {
                page = null;
            }
            try {
                const result = yield this.userService.find(categoryId, page);
                result.status == "success" ? res.send(result)
                    : res.status(500).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const user = req.user;
            try {
                let result;
                result = yield this.userService.findById(user, userId);
                result.status == "success" ? res.send(result)
                    : res.status(400).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        // Nombre descripcion numero
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const data = req.body;
            try {
                const result = yield this.userService.update(userId, data);
                result.status == "success" ? res.send(result)
                    : res.status(400).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.updateUserRating = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, tradeId } = req.params;
            const { comment = "", rating } = req.body;
            const myUserId = req.user.id;
            try {
                const result = yield this.userService.updateRating({ userId, tradeId, comment, rating });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const result = yield this.userService.delete(userId);
                result.status == "success" ? res.send(result)
                    : res.status(400).send(result);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;
