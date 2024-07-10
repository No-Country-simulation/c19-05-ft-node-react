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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_config_1 = require("../utils/bcrypt/bcrypt.config");
const jwt_config_1 = require("../utils/jwt/jwt.config");
const registerEmail_1 = require("../email/registerEmail");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // ta ok.👍
    verifyEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findByEmail(user.email);
                if (userFound) {
                    return {
                        status: "failed",
                        payload: "El correo ya esta registrado"
                    };
                }
                const token = yield (0, jwt_config_1.generateJWTRegister)(user);
                const data = {
                    name: user.name,
                    email: user.email,
                    token: token
                };
                registerEmail_1.Emails.sendConfirmationEmail(data);
                return {
                    status: "success",
                    payload: "Para terminar tu registro verifica tu email."
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    create(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (0, jwt_config_1.dataRegisterJwt)(token);
                const userFound = yield this.userRepository.findByEmail(user.email);
                if (userFound) {
                    return {
                        status: "failed",
                        payload: "El correo ya esta registrado"
                    };
                }
                user.password = yield (0, bcrypt_config_1.hashPassword)(user.password);
                const _a = yield this.userRepository.create(user), { password } = _a, data = __rest(_a, ["password"]);
                return {
                    status: "success",
                    payload: data
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    resetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findByEmail(email);
                if (!userFound) {
                    return {
                        status: "failed",
                        payload: "El correo no esta registrado"
                    };
                }
                const token = (0, jwt_config_1.generateJWTEmail)({ email });
                const data = {
                    name: userFound.name,
                    email: userFound.email,
                    token: token
                };
                registerEmail_1.Emails.sendResetPasswordEmail(data);
                return {
                    status: "success",
                    payload: "Para continuar el reset verifica tu email."
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    updatePassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token, password }) {
            try {
                const { email } = (0, jwt_config_1.dataEmailJwt)(token);
                const hashedPassword = yield (0, bcrypt_config_1.hashPassword)(password);
                const updatedUser = yield this.userRepository.updateByEmail(email, { password: hashedPassword });
                return {
                    status: "success",
                    payload: updatedUser
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    // ta ok.👍
    find(categoryId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: page ? +page : 1,
                limit: 10,
                select: "name email description specialties interests"
            };
            let query = {};
            if (categoryId) {
                query = {
                    specialties: { $elemMatch: { categoryId: new mongoose_1.Types.ObjectId(categoryId) } }
                };
            }
            try {
                const users = yield this.userRepository.find(query, options);
                console.log(users);
                return {
                    status: "success",
                    payload: users
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    // ta ok.👍
    findById(user, searchedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFind = yield this.userRepository.findOne(searchedUserId);
                if (!userFind) {
                    return {
                        status: "error",
                        payload: "Usuario no encontrado"
                    };
                }
                ;
                let userFilterData = {
                    name: userFind.name,
                    description: userFind.description,
                    specialties: userFind.specialties,
                    interests: userFind.interests,
                    userRatings: userFind.userRatings,
                    phoneNumber: null
                };
                console.log(userFind.userRatings.forEach(rating => console.log(rating)));
                if (user) {
                    const result = userFind.contacts.findIndex(contact => (contact === null || contact === void 0 ? void 0 : contact.toString()) === user.id.toString());
                    if (result !== -1) {
                        userFilterData.phoneNumber = userFind.phoneNumber;
                    }
                }
                return {
                    status: "success",
                    payload: userFilterData
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    findByEmail(user, searchedUserEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFind = yield this.userRepository.findByEmail(searchedUserEmail);
                if (!userFind) {
                    return {
                        status: "failed",
                        payload: "El correo no esta registrado"
                    };
                }
                let userFilterData = {
                    name: userFind.name,
                    description: userFind.description,
                    specialties: userFind.specialties,
                    interests: userFind.interests,
                    userRatings: userFind.userRatings,
                    phoneNumber: null
                };
                if (user) {
                    const result = userFind.contacts.findIndex(contact => (contact === null || contact === void 0 ? void 0 : contact.toString()) === user.id.toString());
                    if (result !== -1) {
                        userFilterData.phoneNumber = userFind.phoneNumber;
                    }
                }
                return {
                    status: "success",
                    payload: userFilterData
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    // ta ok.👍
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.update(id, data);
                if (user) {
                    return {
                        status: "success",
                        payload: user
                    };
                }
                else {
                    return {
                        status: "error",
                        payload: "Usuario no encontrado"
                    };
                }
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    // ta ok.👍
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.delete(id);
                if (user) {
                    return {
                        status: "success",
                        payload: user
                    };
                }
                else {
                    return {
                        status: "error",
                        payload: "Usuario no encontrado"
                    };
                }
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    updateRating(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findOne(data.userId);
                if (!userFound)
                    return { status: "error", payload: "Usuario no encontrado" };
                if (userFound.userRatings.length > 0) {
                    userFound.userRatings.findIndex(rating => console.log(rating));
                }
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
}
exports.UserService = UserService;
