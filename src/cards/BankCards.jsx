import '../style/bankcard.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const buttonStyle = {
  backgroundColor: '#007BFF',
  borderColor: '#007BFF',
  color: 'white',
  marginRight: '10px',
  marginBottom: '10px',
};

const BankCard = () => {
  let navigate = useNavigate();

  const onCreditCards = () => {
    navigate('/account/info/card/creditcard');
}

const onDebitCards = () => {
    navigate('/account/info/card/debitcard');
}


  return (
    <div className="container cards">
      <div className="card-row">
        <div className="card card-animation" onClick={onCreditCards}>
          <div className="card-image">
            <img
              //   src="https://example.com/bank-card-image.jpg"
              // src="https://cdn.iconscout.com/icon/free/png-256/free-debit-card-16-842903.png"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFs4fYoo6OfOi4Q4YQFCDpEI2q9wny-psGQ&usqp=CAU"
              alt="Bank Card"
            />
          </div>
          <div className="card-content">
            <h3>Credit Cards</h3>
            <p>Information About Your Credit Cards.</p>
          </div>
        </div>
        <div className="card card-animation" onClick={onDebitCards}>
          <div className="card-image">
            <img
              // src="https://example.com/loan-image.jpg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFs4fYoo6OfOi4Q4YQFCDpEI2q9wny-psGQ&usqp=CAU"
              alt="Bank Card"
            />
          </div>
          <div className="card-content">
            <h3>Debit Cards</h3>
            <p>Information About Your Debit Cards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
