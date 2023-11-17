import React, { useEffect } from "react";
import "../style/adminpage.css"; // Create this CSS file for styling
import { Button } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const buttonStyle = {
  backgroundColor: '#007BFF',
  borderColor: '#007BFF',
  color: 'white',
  marginRight: '10px',
  marginBottom: '10px',
};


function BankAdminPage() {



  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [balance, setBalance] = useState("");
  const [email, setEmail] = useState("");


  async function fetchData() {

    const storedData = localStorage.getItem("data");
    const parseData = await JSON.parse(storedData);


    const storedSender = await parseData && parseData.accountId;
    console.log(storedSender);
    let api = await `http://localhost:8080/account/info/getByAccountId/${storedSender}`;
    await fetch(api, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "Accept": "*/*",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        let result = await response.json();
        console.warn(result);
        localStorage.setItem("data", JSON.stringify(result));
      } else if (response.status === 404) {
        toast.error("Loading...", { "theme": "colored" })
      }
    }).catch((error) => {
      console.error(error);
    });

    // now we feth admin information
    async function loadUserinfo() {
      const storedData = localStorage.getItem("data");
      const parseData = await JSON.parse(storedData);
      console.log(parseData);
      const storedName = await parseData && parseData.username;
      const storedId = await parseData && parseData.accountId;
      const storedBalance = await parseData && parseData.balance;
      const storedEmail = await parseData && parseData.email;

      if (storedName || storedId || storedBalance || storedEmail) {
        setName(storedName);
        setId(storedId);
        setBalance(storedBalance);
        setEmail(storedEmail);
      }
    }
    loadUserinfo();
  }



  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == "false" || localStorage.getItem("isAdmin") == "false" || !localStorage.getItem("isAdmin") == undefined) {
      navigate("/login");
    }
    fetchData();
  }, []);

  let navigate = useNavigate();

  function onCreditCardsReq() {
    navigate("creditRequest");
  }

  function onDebitCardsReq() {
    navigate("debitRequest");
  }

  function onLoanReq() {
    navigate("loanRequest");
  }
  return (
    <>
      <div className="bank-admin-page">
        <div className="admin-details">
          <h1>Admin Details</h1>
          <strong>Admin Name :</strong> {name}
          <br />
          <strong>Account Number :</strong> {id}
          <br />
          <strong>Email :</strong> {email}
          <br />
          <strong>Account Type :</strong> ADMIN
          <br />
          <strong>Balance :</strong> ₹{balance}
          {/* Add more admin details as needed */}
        </div>
      </div>
      <div className="container cards">
        <div className="card-row">
          <div className="card card-animation" onClick={onCreditCardsReq}>
            <div className="card-image">
              <img
                //   src="https://example.com/bank-card-image.jpg"
                // src="https://cdn.iconscout.com/icon/free/png-256/free-debit-card-16-842903.png"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFs4fYoo6OfOi4Q4YQFCDpEI2q9wny-psGQ&usqp=CAU"
                alt="Bank Card"
              />
            </div>
            <div className="card-content">
              <Button style={buttonStyle} onClick={onCreditCardsReq}>Credit Cards Req</Button>
              <h3>Credit Card Requests</h3>
              <p>Information aboute credit card Reqs.</p>
            </div>
          </div>
          <div className="card card-animation" onClick={onDebitCardsReq}>
            <div className="card-image">
              <img
                //   src="https://example.com/bank-card-image.jpg"
                // src="https://cdn.iconscout.com/icon/free/png-256/free-debit-card-16-842903.png"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFs4fYoo6OfOi4Q4YQFCDpEI2q9wny-psGQ&usqp=CAU"
                alt="Bank Card"
              />
            </div>
            <div className="card-content">
              <Button style={buttonStyle} onClick={onDebitCardsReq}>Debit Cards Req</Button>
              <h3>Debit Card Requests</h3>
              <p>Information About Debit Card Reqs.</p>
            </div>
          </div>
          <div className="card card-animation" onClick={onLoanReq}>
            <div className="card-image">
              <img
                // src="https://example.com/loan-image.jpg"
                src="data:image/png;base64,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"
                alt="Loans"
              />
            </div>
            <div className="card-content">
              <Button style={buttonStyle} onClick={onLoanReq}>Loans Req</Button>
              <h3>Loan Requests</h3>
              <p>Information About All Loan Requests.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankAdminPage;
