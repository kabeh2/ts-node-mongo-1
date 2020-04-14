import React from "react";
import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  [key: string]: any;
}

// const MyTextInput = ({ label, ...props }) => {
const MyTextInput = (props: Props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
