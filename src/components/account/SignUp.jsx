import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase";
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
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;

    console.log(email, passwordOne);

    auth
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log(authUser.user.uid);
        db.createUser(authUser.user.uid, username, email).then(() => {
          this.setState(() => ({
            username: "",
            email: "",
            passwordOne: "",
            passwordTwo: "",
            error: null
          }));
          history.push("/");
          console.log("registered");
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <SignInWrapper>
        <CardForm>
          <h4>Login</h4>
          <form onSubmit={this.onSubmit}>
            <InputGroup>
              <FormInput
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
            </InputGroup>
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
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
            <InputGroup>
              <FormInput
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </InputGroup>

            <Button disabled={isInvalid} type="submit">
              Sign Up
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </CardForm>
      </SignInWrapper>
    );
  }
}

export default withRouter(SignUp);
