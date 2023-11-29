
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  margin: "20px auto",
  maxWidth: "800px"
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  borderColor: "#007BFF",
  color: "white",
  marginRight: "10px",
};



const LoanCard = () => {
  let navigate = useNavigate();

  // Replace with your loan information
  function applyLoan() {
    navigate("/account/info/loan/applyloan");
  }

  const [loans,setLoans] = useState([]);

  function fetchData() {
    const storedData = localStorage.getItem("data");
    const parseData =  JSON.parse(storedData);
    const accountId = (parseData) && parseData.accountId;
    let api = `https://${URL}/account/info/loans/getLoan/${accountId}`;

    fetch(api, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 500) {
          toast.error("Internal Server Error", { theme: "colored" });
          navigate(-1);
          throw new Error("Internal Server Error");
        }
      })
      .then((res) => {
        setLoans(res);
      })
      .catch((e) => {
        console.error(e);
      });
    
  }

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == 'false' || localStorage.getItem("isAdmin") == 'true') {
      navigate("/login");
      return;
    }   
    fetchData();
  }, []);

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
    <div className='text-center'>
    <Button style={buttonStyle} onClick={applyLoan}>
          Apply For Loan
      </Button>
      </div>
    </>
  );
};

export default LoanCard;
