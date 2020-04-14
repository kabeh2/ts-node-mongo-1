import config from "config";
import connect from "./lib/db/mongoose";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import taskRouter from "./routers/taskRouter";

const port: string | undefined = config.get("port");

// Express setup
const server: Application = express();

connect();

server.use(express.json());
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(helmet());
server.use(cors());

// Middlewares

// Routers
server.use("/api/users", userRouter);
server.use("/api/tasks", taskRouter);

server.listen(port, () => console.log(`Server listening on port ${port}...`));
