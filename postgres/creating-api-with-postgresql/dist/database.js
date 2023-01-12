"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DATABASE_HOST = _a.DATABASE_HOST, DATABASE_NAME = _a.DATABASE_NAME, DATABASE_USER = _a.DATABASE_USER, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
var client = new pg_1.Pool({
    host: DATABASE_HOST,
    port: 5432,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
});
exports["default"] = client;
