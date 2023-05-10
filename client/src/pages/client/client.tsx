import { gql, useMutation } from "@apollo/client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { ChangeEvent, useRef } from "react";
import { useCookies } from "react-cookie";
import { useHref } from "react-router-dom";
import "../../assets/styles/client.css";

const CREATEUSER_MUTATION = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
      firstName
      lastName
      username
      email
      type
      phoneNumber
      profilePicture
      bio
      skills
      education
      experience
      languages
      hourlyRate
      rating
      reviews
      gigs
      createdAt
      updatedAt
      userJwtToken {
        token
      }
    }
  }
`;

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-clients-and-templates
 */
export const Client = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  const [cookies, setCookie, removeCookie] = useCookies(["userJwtToken"]);

  function onSignupSuccess(response: any) {
    console.log(response);
    setCookie("userJwtToken", response.accessToken, { path: "/" });
    console.log(cookies);
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const signupHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredUsername = usernameRef.current?.value || "";
    const enteredEmail = emailRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";
    const enteredFirstName = firstNameRef.current?.value || "";
    const enteredLastName = lastNameRef.current?.value || "";
    const enteredPhoneNumber = phoneNumberRef.current?.value || "";
    const enteredConfirmPassword = confirmPasswordRef.current?.value || "";
    const enteredType = "client";

    if (
      enteredUsername.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0 ||
      enteredPhoneNumber.trim().length === 0 ||
      enteredConfirmPassword.trim().length === 0
    ) {
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      return;
    }

    const user = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      phoneNumber: enteredPhoneNumber,
      type: enteredType,
    };

    createUser({ variables: { input: user } });

    useHref("/");
  };

  const [createUser, { error, data }] = useMutation(CREATEUSER_MUTATION, {
    variables: {
      input: {
        username: usernameRef.current?.value || "",
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
        firstName: firstNameRef.current?.value || "",
        lastName: lastNameRef.current?.value || "",
        phoneNumber: phoneNumberRef.current?.value || "",
        type: "client",
      },
    },
    onCompleted: (data) => {
      console.log(data);
      onSignupSuccess(data.createUser.userJwtToken);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  if (error) {
    console.log(error);
  }

  if (data)
    console.log(
      data.createUser.userJwtToken.token,
      "data.createUser.userJwtToken.token"
    );
  return (
    <>
      <div className="client_register">
        <p className="title">Sign up to hire a talent</p>
        <div className="container">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
        <div className="container">
          <p>
            -------------------------------------------------------------------------------------------or-------------------------------------------------------------------------------------------
          </p>
        </div>
        <form className="form-container" onSubmit={signupHandler}>
          <div className="col-md-6">
            <div className="form-group">
              <input
                ref={firstNameRef}
                type="text"
                className="form-control"
                id="first-name"
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <input
                ref={lastNameRef}
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <input
                ref={usernameRef}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                ref={confirmPasswordRef}
                type="password"
                className="form-control"
                id="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group">
              <input
                ref={phoneNumberRef}
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
              />
            </div>
            <div className="privacy">
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Yes, I understand and agree to the Upwork Terms of Service , including the User Agreement and Privacy Policy ."
              />
            </div>
            <div className="form-group bouton">
              <button type="submit" className="btn btn-primary">
                Create my account
              </button>
            </div>
            <div className="form-group bouton">
              <p>Already have an account? </p>
              <a href="/login" className="link">
                Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
