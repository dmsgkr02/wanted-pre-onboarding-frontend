import React, {useState} from 'react'
import ValidInput from '../element/ValidInput'
import { RequireRule, MinimumLengthLimit, EmailRule } from '../utils/constant';

export default function SignUi(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);

  return (
    <div>
      <ValidInput placeholder="이메일" dataTestid="email-input" value={email} onChange={setEmail} rules={[RequireRule, EmailRule]} setValidation={setEmailValidation}/>
      <br/ >
      <ValidInput placeholder="비밀번호" dataTestid="password-input" value={password} onChange={setPassword} rules={[RequireRule, MinimumLengthLimit(8)]} setValidation={setPasswordValidation}/>
      <br/ >
      <button data-testid={props.buttonId} disabled={!emailValidation || !passwordValidation} onClick={() => props.onClick(email, password)}>{props.buttonName}</button>
    </div>
  )
}