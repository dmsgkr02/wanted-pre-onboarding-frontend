import React, {useState} from 'react'
import './ValidInput.css'

export default function ValidInput(props) {
  const [validation, setValidation] = useState(false);
  const [helpWords, setHelpWords] = useState("");
  
  const handleChange = (event) => {
    props.onChange(event.target.value);
    handleCheck(event.target.value);
  }

  const handleCheck = (value) => {
    
    for (let rule of props.rules) {
      if (!rule.rule.test(value) === rule.match) {
        setHelpWords(rule.message);
        setValidation(false);
        props.setValidation(false);
        return null;
      }
    }
    
    props.setValidation(true);
    setValidation(true);
  }

  return (
    <div className='valid-container'>
      <div>
        <label htmlFor={props.dataTestid}>
          {props.placeholder}
        </label>
      </div>
      <input className="valid-input" id={props.dataTestid} placeholder={props.placeholder} data-testid={props.dataTestid} value={props.value} onChange={handleChange} type={props.type}/>
      <div className='valid-message'>
        {validation ? null : helpWords}
      </div>
    </div>
  )
}
