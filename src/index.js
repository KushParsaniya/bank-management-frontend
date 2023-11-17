import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DeleteAccount from './pages/DeleteAccountPage';
import AccountInfo from './pages/AccountInfo';
import BankCard from './cards/BankCards';
import LoanCard from './cards/Loan';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionHistory from './pages/TransactionHistoryPage';
import CreditCard from './pages/CreditCardPages';
import DebitCard from './pages/DebitCardPages';
import TransferMoney from './pages/TransferMoneyPage';
import BankAdminPage from './pages/AdminPage';
import CreditRequest from './pages/Admin/CreditRequest';
import DebitRequest from './pages/Admin/DebitRequest';
import LoanRequest from './pages/Admin/LoanRequest';
import BankNotice from './pages/BankNotice';
import BankContact from './pages/BankContact';
import BankAboutUs from './pages/AboutUs';
import UserDepositePage from './pages/UserDepositeMoneyPage';
import LoanApply from './pages/LoanApply';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path='/notice' element={<BankNotice />} />
      <Route path="/contact" element={<BankContact />} />
      <Route path="/aboutus" element={<BankAboutUs />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path="/close" element={<DeleteAccount />} />
      <Route path='/account/info' element={<AccountInfo />} />
      <Route path='/account/info/card' element={<BankCard />} />
      <Route path='/account/info/loan' element={<LoanCard />} />
      <Route path='/account/info/deposit' element={<UserDepositePage />} />
      <Route path='/account/info/transactionHistory' element={<TransactionHistory />} />
      <Route path="account/info/card/creditcard" element={<CreditCard />} />
      <Route path="account/info/card/debitcard" element={<DebitCard />} />
      <Route path="account/info/loan/applyloan" element={<LoanApply />} />
      <Route path="account/info/transfermoney" element={<TransferMoney />} />
      <Route path='/admin/info' element={<BankAdminPage />} />
      <Route path='/admin/info/creditRequest' element={<CreditRequest />} />
      <Route path='/admin/info/debitRequest' element={<DebitRequest />} />
      <Route path='/admin/info/loanRequest' element={<LoanRequest />} />



    </Routes>
  </BrowserRouter>
  </>
);

