import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { ChangeEvent, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/client.css";

const CREATEUSER_MUTATION = gql`
  mutation CreateUser($Input: UserInputInput) {
    createUser(Input: $Input) {
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

  const navigate = useNavigate();
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  const [cookies, setCookie, removeCookie] = useCookies(["userJwtToken"]);

  function onSignupSuccess(response: any) {
    console.log(response);
    setCookie("userJwtToken", response.token, { path: "/" });
    console.log(cookies);
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const signupHandler = (e: any) => {
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

    createUser({ variables: { Input: user } });

    navigate("/");
  };

  const [createUser, { error, data }] = useMutation(CREATEUSER_MUTATION, {
    variables: {
      Input: {
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
    <Card
      p="10"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 10%)",
        width: "50%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <h1>Sign up as a client</h1>
      <form onSubmit={signupHandler}>
        <FormControl >
          <FormLabel>First Name</FormLabel>
          <Input type="text" ref={firstNameRef} />
          <FormLabel>Last Name</FormLabel>
          <Input type="text" ref={lastNameRef} />
          <FormLabel>Username</FormLabel>
          <Input type="text" ref={usernameRef} />
          <FormLabel>Email</FormLabel>
          <Input type="email" ref={emailRef} />
          <FormLabel>Password</FormLabel>
          <Input type="password" ref={passwordRef} />
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" ref={confirmPasswordRef} />
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" ref={phoneNumberRef} />
          <FormLabel>Terms and conditions:</FormLabel>
          <Checkbox>
            Yes, I understand and agree to the Upwork Terms of Service , including
            the User Agreement and Privacy Policy .
          </Checkbox>
          <FormControl
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button type="submit">Sign up</Button>
            <FormControl>
              <Text>
                ---------------------------------or-------------------------------
              </Text>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </FormControl>
            <Text>Already have an account?</Text>
            <a href="/login">
              <Button type="submit">Log in</Button>
            </a>
          </FormControl>
        </FormControl>
      </form>
    </Card>
  );
};
