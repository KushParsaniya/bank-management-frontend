import React from 'react';
import '../style/bankcontact.css'; // Create a separate CSS file for styling

const BankContact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or concerns, feel free to reach out to us using the contact information below.
        </p>
        <div className="contact-info">
          <div>
            <div className="contact-icon">📧</div>
            <a href="mailto:info@yourbank.com" className="contact-link">info@yourbank.com</a>
          </div>
          <div>
            <div className="contact-icon">☎️</div>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <div className="contact-icon">🏢</div>
            <p>Your Bank, 123 Main Street, Cityville</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankContact;
