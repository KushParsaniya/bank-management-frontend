import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/userdeposite.css'
import { useNavigate } from 'react-router-dom';

const UserDepositPage = () => {
  const navigate = useNavigate();

  const handleDeposit = () => {
    navigate(-1);
  };

  return (
    <Container>
        <div className="text-center">
      <h1 className="mt-5">Bank Deposit</h1>
      <br />
      <h5 className="mt-2">
        You have to go to nearest Bank or ATM for Deposite.</h5>
        <br />
        <Button variant="primary" onClick={handleDeposit}>
          Go Back
        </Button>  
        </div>
          </Container>
  );
};

export default UserDepositPage;