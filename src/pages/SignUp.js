import React from "react";
import SignUi from "../components/SignUi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const signUp = (email, password) => {
    fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((response) => {
      if (response.status === 201) {
        navigate('/signin');
      } else {
        return response.json();
      }
    }).then((data) => {
      throw new Error(data.message);
    }).catch((error) => {
      setErrorMessage(error.message);
    })
  }

  return (
    <SignUi buttonId={"signup"} onClick={signUp} errorMessage={errorMessage}/>
  );
}

export default SignUp