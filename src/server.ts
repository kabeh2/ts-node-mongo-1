import config from "config";
import connect from "./lib/db/mongoose";
import express, { Application } from "express";
import helmet from "helmet";

const port: string | undefined = config.get("port");

// Express setup
const server: Application = express();

connect();

server.use(express.json());
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

// Middlewares

// Routers

server.listen(port, () => console.log(`Server listening on port ${port}...`));
