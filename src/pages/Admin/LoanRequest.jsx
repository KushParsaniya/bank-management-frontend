import React from 'react';
import '../../style/loan.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "../../style/loanReq.css";



function LoanRequest() {
  const [requests, setRequests] = useState([]);
  let navigate = useNavigate();

  function fetchData(){
    const api =
      `https://${process.env.REACT_APP_URL}/account/info/loans/getAllLoanRequests`;
    fetch(api, {
      headers: {
        // "Content-Type": "application/json",
        "Authorization":localStorage.getItem("Authorization"),

        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          toast.error("No Loan request pending", { theme: "colored" });
        } else if (response.status === 500) {
          toast.error("Internal Server Error", { theme: "colored" });
          navigate(-1);
          throw new Error("Internal Server Error");
        }
      })
      .then(async (res) => {
        console.log(res);
        await setRequests(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == "false" || localStorage.getItem("isAdmin") == "false" || !localStorage.getItem("isAdmin") == undefined) {
      navigate("/login");
      return;
    }
    fetchData();
  },[]);


  function onApprove(reqId) {

    let api = `https://${process.env.REACT_APP_URL}/account/info/loans/createLoan/${reqId}`;

    fetch(api, {
      method: 'GET',
      headers: {
        "Authorization":localStorage.getItem("Authorization"),

        // "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).
      then((response) => {
        if (response.status === 200) {
          toast.success("Loan Request Accepted", { "theme": "colored" });
          // navigate(-1);
        } else if (response.status === 404) {
          toast.error("No Account Found.", { "theme": "colored" });
          throw new Error("No Account Found");
        } else if (response.status === 500) {
          toast.error("Internal Server Error", { "theme": "colored" });
          throw new Error("Internal Server Error");
        }
      }).catch((e) => { console.error(e) })
      .then(() => {
        let api2 = `https://${process.env.REACT_APP_URL}/account/info/loans/deleteLoanRequest/${reqId}`;
        fetch(api2, {
          method: "DELETE",
          headers: {
            "Authorization":localStorage.getItem("Authorization"),
            // "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("sucssesfully deleted req from database");
              return;
            } else if (response.status === 404) {
              throw new Error("Loan request not found");
            } else if (response.status === 500) {
              throw new Error("Internal Server Error");
            }
          }).catch((error) => {
            console.error(error);
          });
      })

    setRequests(prevRequests => prevRequests.filter(request => request.requestId !== reqId));

  }

  function onDecline(reqId) {
    let api = `https://${process.env.REACT_APP_URL}/account/info/loans/deleteLoanRequest/${reqId}`;

    fetch(api, {
      method: "DELETE",
      headers: {
        "Authorization":localStorage.getItem("Authorization"),
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Loan request declined", { "theme": "colored" });
        // navigate(-1);
      } else if (response.status === 404) {
        // toast.error("Credit card request not found", { theme: "colored" });
        throw new Error("Loan request not found");
      } else if (response.status === 500) {
        toast.error("Internal Server Error", { theme: "colored" });
        throw new Error("Internal Server Error");
      }
    }).catch((error) => {
      console.error(error);
    });
    setRequests(prevRequests => prevRequests.filter(request => request.requestId !== reqId));
  }


  const requestItems = () => {
    if (requests === undefined || !requests.length) {
      return <h5 className="text-center">No Loan Requests pending.</h5>;
    }
    const listItems = [];

    requests.map((card, i) => {
      listItems.push(
        <div className="loan-request-section text-center">
          <h4>Request - {i + 1}</h4>
          <div className="request-card">
            <strong>Account Holder : </strong>{card.username}
            <br />
            <strong>Holder email : </strong>{card.email}
            <br />
            <strong>Account Number : </strong>{card.accountId}
            <br />
            <strong>Account Balance : </strong>₹{card.balance}
            <br />
            <strong>Applied Amount : </strong>₹{card.appliedAmount}
            <br />
            <strong>expected Interest Rate : </strong>{card.loanInterest} %
            <div className="button-container pt-3">
              <button className="approve-button" onClick={() => onApprove(card.requestId)}>Approve</button>
              <button className="decline-button" onClick={() => onDecline(card.requestId)}>Decline</button>
            </div>
          </div>
        </div>
      );
    });
    return listItems;
  };
  return (
    <>
    <div className="text-center">
      <h2>Loan Resquests</h2>
    </div>
    {requestItems()}
    </>
  );
}

export default LoanRequest;