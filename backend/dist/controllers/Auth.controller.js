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
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const result = yield this.authService.login(data);
                if (result.status !== "success") {
                    res.status(400).send(result);
                }
                else {
                    res.cookie("token", result.payload, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
                    res.send({
                        status: "success",
                        payload: "Login exitoso"
                    });
                }
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
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                res.sendStatus(200);
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
        this.user = (req, res) => {
            try {
                res.status(200).send({
                    status: "success",
                    payload: req.user
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(500).send("Error interno");
                }
            }
        };
        this.authService = authService;
    }
}
exports.AuthController = AuthController;
