import React from 'react'
import SignUi from '../component/SignUi'
import { useNavigate } from "react-router-dom";

export default function Signin() {

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
    <>
      <SignUi buttonId="signin-button" buttonName="로그인" onClick={signIn}/>
      {errorMessage}
    </>
    
  )
}
