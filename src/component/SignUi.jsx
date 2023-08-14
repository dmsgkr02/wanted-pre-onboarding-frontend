import React, {useState} from 'react'
import ValidInput from '../element/ValidInput'
import { RequireRule, MinimumLengthLimit, CantStartAt, EmailRule } from '../utils/constant';
import './SignUI.css';

export default function SignUI(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);

  return (
    <div className='container'>
      <div className='main-container'>
        <div className='title'>
          {props.buttonName}
        </div>
        <div>
          {props.errorMessage}
        </div>
        <div className='input-container'>
          <ValidInput placeholder="이메일" dataTestid="email-input" value={email} onChange={setEmail} rules={[RequireRule, EmailRule, CantStartAt]} setValidation={setEmailValidation}/>
          <ValidInput placeholder="비밀번호" dataTestid="password-input" value={password} onChange={setPassword} rules={[RequireRule, MinimumLengthLimit(8)]} setValidation={setPasswordValidation} type="password"/>
          <button className="valid-input" data-testid={props.buttonId} disabled={!emailValidation || !passwordValidation} onClick={() => props.onClick(email, password)}>{props.buttonName}</button>
        </div>
      </div>
    </div>
  )
}