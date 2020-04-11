"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const dbConfig = config_1.default.get("dbConfig");
const connect = () => mongoose_1.default
    .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => {
    return console.log(`Successfully connected to the db...`);
})
    .catch((error) => {
    console.log("Error connecting to database: ", error);
    return process.exit(1);
});
exports.default = connect;
