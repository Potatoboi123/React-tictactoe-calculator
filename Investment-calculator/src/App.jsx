import Header from './components/Header.jsx'
import UserInput from './components/UserInput.jsx'
import Result from './components/Result.jsx'

import {calculateInvestmentResults} from './util/investment.js'
import { useState } from 'react'

function App() {
  const [resultInput,setResultInput]=useState({
    initialInvestment:10000,
    annualInvestment:1200,
    expectedReturn:6,
    duration:10,
  })

  const results=calculateInvestmentResults(resultInput);

  function handleUpdateResult(name,value){
    
    setResultInput(prevResultInput=>{
      return {...prevResultInput,[name]: +value}
    });

  }
  const inputIsValid=resultInput.duration >= 1;
  return (
    <>
    <Header></Header>
    <section id='user-input'>
      <div className='input-group'>
        <UserInput labelname="Initial Invesment" name="initialInvestment" onUpdateResult={handleUpdateResult} value={resultInput.initialInvestment}></UserInput>
        <UserInput labelname="Annual Investment" name="annualInvestment" onUpdateResult={handleUpdateResult} value={resultInput.annualInvestment}></UserInput>
        <UserInput labelname="Expected Return" name="expectedReturn" onUpdateResult={handleUpdateResult} value={resultInput.expectedReturn}></UserInput>
        <UserInput labelname="Duration" name="duration" onUpdateResult={handleUpdateResult} value={resultInput.duration}></UserInput>
      </div>
    </section>

    <table id='result'>
      {!inputIsValid && <p className='center'>Please Enter Duration Greater Than Zero.</p>}
      {inputIsValid && <Result results={results}></Result>}
    </table>
    </>
  )
}

export default App
