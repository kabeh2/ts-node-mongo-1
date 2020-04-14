import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  children: string;
  [key: string]: any;
}

// const MyCheckbox = ({ children, ...props }) => {
const MyCheckbox = (props: Props) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {props.children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyCheckbox;
