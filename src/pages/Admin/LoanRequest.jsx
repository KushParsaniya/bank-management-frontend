import React from 'react';
import '../../style/loan.css';

function LoanRequest() {
  return (
    <>
    <div className="text-center">
      <h2>Loan Resquests</h2>
    </div>
    <div className="loan-request-section text-center">
        <h4>Request - 1</h4>
      {/* Render debit request cards here */}
      <div className="request-card">
          <p>Account: 123456</p>
          <p>Amount: $1000</p>
          <p>Type: HOME</p>
          <p>Interest : 1.5</p>
          <div className="button-container">
            <button className="approve-button">Approve</button>
            <button className="decline-button">Decline</button>
          </div>
        </div>
    </div>
    </>
  );
}

export default LoanRequest;