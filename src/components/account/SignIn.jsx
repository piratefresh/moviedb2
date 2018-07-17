import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase";
import firebase from "firebase";
import { fetchLoginRequest } from "../../actions/authActions";
// Styled
import styled from "styled-components";
import Button from "../common/Button";
import FormInput from "../common/FormInput";

const SignInWrapper = styled.div``;
const CardForm = styled.div`
  margin: 10% auto;
  background: #fbfbfb;
  width: 400px;
  color: #2b2b2b;
  display: flex;
  flex-direction: column;
  padding: 2%;
  button {
    padding: 10px 0;
    width: calc(100% - 10px);
  }
`;
const InputGroup = styled.div`
  padding: 2% 0;
`;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth
          .signInWithEmailAndPassword(email, password)
          .then(
            this.setState(() => ({
              email: "",
              password: "",
              error: null
            }))
          )
          .catch(error => {
            this.setState({
              error
            });
          });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    this.props.history.push("/");
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <SignInWrapper>
        <CardForm>
          <h4>Login</h4>
          <form onSubmit={this.onSubmit}>
            <InputGroup>
              <FormInput
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </InputGroup>
            <InputGroup>
              <FormInput
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
            <Button disabled={isInvalid} type="submit">
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </CardForm>
      </SignInWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchLoginRequest }
)(withRouter(SignUp));
