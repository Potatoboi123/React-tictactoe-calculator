import { useState } from "react";
export default function UserInput({ labelname, name,onUpdateResult,value }) {
    const [investmentValue,setInvestmentValue]=useState({name:value});

    function handleChangeInput(event){
        let value=event.target.value;
        onUpdateResult(name,value);
        setInvestmentValue({name:value})
    }
    
  return (
    <p>
      <label htmlFor={name}>{labelname}</label>
      <input type="number" id={name} value={investmentValue.name} onChange={handleChangeInput} required/>
    </p>
  );
}
