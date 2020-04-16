import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { login, toggleAuth } from "../../store/actions/actionCreators";
import { AppState } from "../../store/reducers";
import { User } from "../../store/actions/types/User";
import { UserCredentials } from "../../store/actions/types/UserCredentials";
import MyTextInput from "./MyTextInput";

type Props = LinkDispatchProps & LinkStateProp;

const initialState: string = "";

const LoginForm = (props: Props) => {
  const [inputError, setInputError] = useState(initialState);
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    if (props.errors) {
      setInputError(props.errors);
    }
    console.log(inputError);
  }, [props.errors]);

  console.log(inputError);
  console.log("LOGIN LOGGEDIN: ", props.loggedIn);

  return (
    <>
      <h1>Login!</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={async (
          values,
          { setSubmitting, setErrors, setStatus, resetForm }
        ) => {
          try {
            await props.login(values);
            resetForm({});
            setStatus({ success: true });
            console.log("Errors: ", props.errors.length);
            if (props.errors.length === 0) {
              props.toggleAuth();
              history.replace("/");
            }
          } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({});
          }
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
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {/* {inputError && <div className="error">{inputError}</div>} */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

interface LinkStateProp {
  user: User;
  errors: string;
  loggedIn: boolean;
}

interface LinkDispatchProps {
  login: (credentials: UserCredentials) => void;
  toggleAuth: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  user: state.fetchReducer.user,
  errors: state.fetchReducer.errors,
  loggedIn: state.fetchReducer.loggedIn,
});

const mapDispatchToProps = (dispatch: any): LinkDispatchProps => ({
  login: (credentials: any) => dispatch(login(credentials)),
  toggleAuth: () => dispatch(toggleAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
