import React from "react";
import Container from "react-bootstrap/Container";
import { getToken } from "../../services/auth.service";
import { Redirect } from "react-router-dom";

const Home = () => {
  // if (!getToken()) {
  //   return <Redirect to="/login" />;
  // }
  return <Container>Home Page</Container>;
};

export default Home;
