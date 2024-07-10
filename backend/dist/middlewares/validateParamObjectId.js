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
exports.middlewareParamsObjectId = void 0;
const mongoose_1 = require("mongoose");
const middlewareParamsObjectId = (nombreId) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = mongoose_1.Types.ObjectId.isValid(req.params[nombreId]);
    if (result)
        return next();
    res.status(400).send({
        status: "error",
        message: "Id invalido"
    });
});
exports.middlewareParamsObjectId = middlewareParamsObjectId;
