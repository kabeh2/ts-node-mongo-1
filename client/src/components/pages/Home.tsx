import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import { getToken } from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import { getUserAction } from "../../store/actions/actionCreators";
import { AppState } from "../../store/reducers";

type Props = LinkDispatchProps & LinkStateProps;

const Home = (props: Props) => {
  useEffect(() => {
    const loggedIn = props.getUserAction();

    console.log("LOGGEDINHOME: ", loggedIn);
  }, [props.loggedIn]);
  // if (!getToken()) {
  //   return <Redirect to="/login" />;
  // }
  return <Container>Home Page</Container>;
};

interface LinkStateProps {
  loggedIn: boolean;
}

interface LinkDispatchProps {
  getUserAction: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  loggedIn: state.fetchReducer.loggedIn,
});

const mapDispatchToProps = (dispatch: any): LinkDispatchProps => ({
  getUserAction: () => dispatch(getUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
