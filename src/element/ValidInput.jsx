import React, {useState, useEffect} from 'react'

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

  useEffect(() => {
    handleCheck("");
  }, []);

  
  return (
    <>
      <input placeholder={props.placeholder} data-testid={props.dataTestid} value={props.value} onChange={handleChange}/>
      {validation ? null : helpWords}
    </>
  )
}
