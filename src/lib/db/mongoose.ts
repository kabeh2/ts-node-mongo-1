import mongoose from "mongoose";
import config from "config";

const dbConfig: any = config.get("dbConfig");

const connect: () => Promise<void> = () =>
  mongoose
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

export default connect;
