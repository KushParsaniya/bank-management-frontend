import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  margin: "20px auto",
  // width : '45%',
  maxWidth: "800px",
};

const buttonStyle = {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
    color: "white",
    marginRight: "10px",
  };

function CreditCard() {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  let navigate = useNavigate();

  function fetchData(){
    const data = localStorage.getItem("data");
    const parseData = JSON.parse(data);
    const storedName = parseData && parseData.username;
    const accountId = parseData && parseData.accountId;
    setName(storedName);
    let api = `https://${process.env.REACT_APP_URL}/account/info/cards/getCreditCard/${accountId}`;

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
        setCards(res);
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

  const creditCardItem = () => {
    if (!cards.length) {
      return <h5 className="text-center">No Cards Found</h5>;
    }
    const listItems = [];

    cards.map((card , index) => {
      listItems.push(
        <div className="card" style={cardStyle}>
          <div className="card-header">Credit Card - {index + 1}</div>
          <div className="card-body" id="bank-card-div">
            <p>Card Holder : {name}</p>
            <p>Card Number : {card.cardNumber}</p>
            <p>Expiration Date : {card.expirationDate}</p>
            <p>Credit Limit : ₹{card.creditLimit}</p>
            <p>Used Credit Limit : ₹{card.usedCreditLimit}</p>
            <p>CVV : {card.cvv}</p>
          </div>
        </div>
      );
    });
    return listItems;
  };

  async function applyForCredit() {
    // hit api here
    const storedData = localStorage.getItem("data");
    const parseData = await JSON.parse(storedData);
    const accountId = await parseData && parseData.accountId;

    let api = await `https://${process.env.REACT_APP_URL}/account/info/cards/requestCreditCard/${accountId}`;


    await fetch(api,{
      method : "GET",
      headers : {
        "Authorization":localStorage.getItem("Authorization"),
        // "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
    }).then(async (response) => {
      if (response.status === 200){
        toast.success("successfully applied",{theme : "colored"});
        navigate(-1);
        return;
      }
      else if (response.status === 500) {
        toast.error("Internal Server Error", { theme: "colored" });
        throw new Error("Internal Server Error");
      } else if (response.status === 404){
        toast.error("User not found", { theme: "colored" });
        throw new Error("User not found");
      }
    }).catch((err) => {
      console.error(err.message);
    });

}

  return (
  <>
  {creditCardItem()}
  <div className="text-center">
        <Button style={buttonStyle} onClick={applyForCredit}>
          Apply For Credit Card
        </Button>
      </div>
  </>
  );
}

export default CreditCard;
