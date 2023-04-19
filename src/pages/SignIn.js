import React from "react";
import SignUi from "../components/SignUi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);
  
  const signIn = (email, password) => {
    fetch(`${process.env.REACT_APP_BACK_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((response) => response.json())
      .then((data) => {
      if (data.access_token) {
        localStorage.setItem("JWT", data.access_token);
        navigate("/todo");
      } else {
        throw new Error(data.message);
      }
    }).catch((error) => {
      setErrorMessage(error.message);
    });
  }
  
  return (
    <SignUi buttonId={"signin"} onClick={signIn} errorMessage={errorMessage}/>
  );
}

export default SignIn