import {formatter} from '../util/investment.js'

let headings=['Year','Investment','Interest','Total','Invested Capital']
export default function Result({results}){
    
    const initialInvestment=results[0].valueEndOfYear-results[0].interest-results[0].annualInvestment
    return (
        <>
        <thead>
        <tr>
            {headings.map((heading)=> <th key={heading}>{heading}</th> )}
        </tr>
        </thead>

        <tbody>

        {results.map((result,index)=>{
            const totalInterest=result.valueEndOfYear-result.annualInvestment*result.year-initialInvestment
            const totalAmountInvested=result.valueEndOfYear-totalInterest
            return (
                <tr key={index}>
                    <td>{result.year}</td>
                    <td>{formatter.format(result.valueEndOfYear)}</td>
                    <td>{formatter.format(result.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
            )
        })}
        </tbody>
        
        </>
    );
}