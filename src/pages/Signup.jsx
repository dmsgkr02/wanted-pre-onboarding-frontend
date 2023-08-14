import React from 'react'
import SignUI from '../component/SignUI'
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const signUp = (email, password) => {
    console.log(`${process.env.REACT_APP_BACK_URL}/auth/signup`);
    fetch(`${process.env.REACT_APP_BACK_URL}/auth/signup`, {
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
    <SignUI buttonId="signup-button" buttonName={"회원가입"} onClick={signUp} errorMessage={errorMessage}/>
  )
}
