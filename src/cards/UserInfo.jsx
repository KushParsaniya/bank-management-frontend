import {Card, Button} from "react-bootstrap";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/userinfo.css"


const cardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  margin: "20px auto",
  width: "90%",
  maxWidth: "800px",
};

const headerStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  borderColor: "#007BFF",
  color: "white",
  marginRight: "10px",
};

function UserInfo() {

  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [balance, setBalance] = useState("");
  const [accountType, setaccountType] = useState("");

  async function loadUserinfo() {
    const storedData = localStorage.getItem("data");
    const parseData = await JSON.parse(storedData);
    console.log(parseData);
    const storedName = await parseData && parseData.username;
    const storedId = await parseData && parseData.accountId;
    const storedBalance = await parseData && parseData.balance;
    const storedType =  await parseData && parseData.type;

    if (storedName || storedId || storedBalance || storedType) {

      setName(storedName);
      setId(storedId);
      setBalance(storedBalance);
      setaccountType(storedType);
    }
  }

  useEffect(() => {
    loadUserinfo();


  },[]);

  function toDeposit(){
    // navigate("..",{relative : 'account/info/deposit'});
    navigate("deposit");
  }

  function toTransfer(){
      navigate("transfermoney");
  }
  
  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title style={headerStyle}>Account Information</Card.Title>
        <Card.Text>
          <strong>User Name :</strong> {name}
          <br />
          <strong>Account Number :</strong> {id}
          <br />
          <strong>Account Type :</strong> {accountType}
          <br />
          <strong>Balance :</strong> ₹{balance}
        </Card.Text>
        <Button style={buttonStyle} onClick={toTransfer}>Transfer Money</Button>
        <Button style={buttonStyle} onClick={toDeposit}>Deposit</Button>
      </Card.Body>
    </Card>
  );
}

export default UserInfo;
