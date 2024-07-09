"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const numberEnum = {
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
};
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    specialties: {
        type: [
            {
                categoryId: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'Category',
                },
                specialtyId: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'Specialty',
                },
            },
        ],
        default: [],
    },
    interests: {
        type: [
            {
                idCategory: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'Category',
                },
                idSpecialty: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'Specialty',
                },
            },
        ],
        default: [],
    },
    description: {
        type: String,
        default: 'Mi descripcion',
    },
    userRatings: {
        type: [
            {
                userId: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'User',
                },
                tradeId: {
                    type: mongoose_1.Types.ObjectId,
                    ref: 'Trade',
                },
                comment: {
                    type: String,
                    default: '',
                },
                rating: {
                    type: Number,
                    enum: [1, 2, 3, 4, 5],
                },
            },
        ],
        default: [],
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    trades: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: 'Trade',
            },
        ],
        default: [],
    },
    contacts: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    },
});
UserSchema.plugin(mongoose_paginate_v2_1.default);
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
