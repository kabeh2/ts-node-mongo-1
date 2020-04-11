import { ObjectId } from "mongodb";
import mongoose, { Document, Schema, model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  owner: ObjectId;
  [key: string]: any;
}

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
