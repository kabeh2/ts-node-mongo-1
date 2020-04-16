import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink, Redirect, Link } from "react-router-dom";
import { getToken, removeToken } from "../../services/auth.service";
import { logoutAction } from "../../store/actions/actionCreators";
import { AppState } from "../../store/reducers";

type Props = LinkDispatchProps & LinkStateProps;

const Header = (props: Props) => {
  const [state, setstate] = useState(false);
  let loggedIn: string | null = getToken();

  const onLogout = () => {
    // Logout of Database
    props.logoutAction();

    // Logout Clientside happens via saga
    removeToken();

    // Redirect to Login
    return <Redirect to="/login" />;
  };

  useEffect(() => {
    if (!getToken()) {
      setstate(!state);
    }
  }, [props.loggedIn]);

  console.log("LOGGEDIN: ", state);
  console.log("TOKEN?: ", loggedIn);

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Node/React TS Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/" exact activeClassName="selected">
                Home
              </NavLink>
            </Nav>
            <Nav>
              {!loggedIn && (
                <>
                  <NavLink to="/add" exact activeClassName="selected">
                    Add
                  </NavLink>
                  <NavLink to="/signup" exact activeClassName="selected">
                    Sign Up
                  </NavLink>
                </>
              )}
              {!loggedIn ? (
                <NavLink to="/login" exact activeClassName="selected">
                  Login
                </NavLink>
              ) : (
                <Link to="/login" onClick={onLogout}>
                  Logout
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

interface LinkStateProps {
  loggedIn: boolean;
}

interface LinkDispatchProps {
  logoutAction: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  loggedIn: state.fetchReducer.loggedIn,
});

const mapDispatchToProps = (dispatch: any): LinkDispatchProps => ({
  logoutAction: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
