import React from "react";

const reg = /.@/;

const SignUi = ({buttonId, onClick, errorMessage }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, [errorMessage]);

  return (
    <div>
      <img />
      <h1>{buttonId.toUpperCase()}</h1>
        <div>      
          이메일
          <br />
          <input data-testid="email-input" type="text" value={email} onChange={handleEmail} />
          <br />
          비밀번호
          <br />
          <input data-testid="password-input" type="password" value={password} onChange={handlePassword} />
          <br />
          {/* <button data-testid={`${buttonId}-button`} disabled={!(reg.test("@") && password.length >= 8)} onClick={() => onClick(email, password)} >회원가입</button> */}
          <button data-testid={`${buttonId}-button`} disabled={!(email.includes("@") && password.length >= 8)} onClick={() => onClick(email, password)} >{buttonId.toUpperCase()}</button>
          
          <h2>{errorMessage}</h2>

        </div>
    </div>
  );
}

export default SignUi