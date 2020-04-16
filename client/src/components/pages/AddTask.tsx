import React from "react";
import { getToken } from "../../services/auth.service";
import { Redirect } from "react-router-dom";

const AddTask = () => {
  if (!getToken()) {
    return <Redirect to="/login" />;
  }
  return <div>Add Task Page</div>;
};

export default AddTask;
