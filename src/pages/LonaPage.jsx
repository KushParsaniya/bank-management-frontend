
import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  margin: "20px auto",
  maxWidth: "800px"
};



const LoanCard = () => {
  // Replace with your loan information



  const [loans,setLoans] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('data');
    const parseData = JSON.parse(data);
    const storedLoans = parseData.loans;
    
    if(storedLoans){
      setLoans(storedLoans);
      console.log(storedLoans);
    }
  },[]);

  const LoanItems = () => {
    if (!loans.length) {
      return <h5 className='text-center'>No Active Loans</h5>
    }
    const listItems = [];
    loans.map((loan) => {
      listItems.push(
        <div className="card" style={cardStyle}>
          <div className="card-header">Loan Information</div>
          <div className="card-body">
            <p>Loan Type : {loan.loanType}</p>
            <p>Loan Amount : {loan.loanAmount}</p>
            <p>Interest Rate : {loan.loanInterest} %</p>
          </div>
        </div>
      );
    })
    return listItems;
  }


  return (
    <>
    {LoanItems()}
    </>
  );
};

export default LoanCard;
