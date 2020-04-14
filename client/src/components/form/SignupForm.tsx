import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import MyCheckbox from "./MyCheckbox";

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Signup!</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          //   acceptedTerms: false, // added for our checkbox
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          //   acceptedTerms: Yup.boolean()
          //     .required("Required")
          //     .oneOf([true], "You must accept the terms and conditions."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {/* <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox> */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;
