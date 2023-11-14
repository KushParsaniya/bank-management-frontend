import { Container, Row, Col, Button } from 'react-bootstrap';
import "../style/bankinfo.css";

function BankInfo() {
    return (
        <div className="bank-container">
      <div className="bank-homepage">
        <header className="bank-header">
          <h1>Welcome to Easy-Bank</h1>
          <p>Your Trusted Banking Partner</p>
        </header>
        <div className="bank-content">
          <div className="bank-intro">
            <h2>About Us</h2>
            <p>
              Easy-Bank is your reliable partner for all your financial needs. We are committed to providing secure and convenient banking services to our valued customers.
            </p>
          </div>
          <div className="bank-features">
            <div className="feature">
              <h3>Account Balance</h3>
              <p>Check your account balance anytime.</p>
            </div>
            <div className="feature">
              <h3>Transaction History</h3>
              <p>View your transaction history.</p>
            </div>
            <div className="feature">
              <h3>Transfer Money</h3>
              <p>Transfer funds securely to anyone, anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default BankInfo;