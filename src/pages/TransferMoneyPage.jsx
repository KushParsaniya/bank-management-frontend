import { Container, Form, Button } from 'react-bootstrap';
import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../style/TransferMoney.css';
import { toast } from 'react-toastify';


function TransferMoney() {
    const storedData = localStorage.getItem('data');
  const parseData = JSON.parse(storedData);

    let api = `https://${url}/account/info/transfer`

    let navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [receiverId,setReceiverId] = useState('');
  const [senderId,setSenderId] = useState('');

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == 'false' || localStorage.getItem("isAdmin") == 'true') {
      navigate("/login");
      return;
    }   
  
  }, []);


    async function handleTransfer(){

        if (amount <= 0 || receiverId == null){
            toast.error("please enter valid information",{"theme":"colored"})
            return;
        }
        
        const storedSender = parseData.accountId;

        setSenderId(storedSender);
        
        console.log(senderId);
        
        
        let item = {amount,receiverId,senderId};

        // let result;

        await fetch(api,{
            method : "PUT",
            headers : {
                "Authorization":localStorage.getItem("Authorization"),
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify(item)
        })
        .then(async (response) => {
            if(response.status === 200) {
                toast.success("successfully transferred",{"theme":"colored"});
                // navigate("account/info")
                navigate(-1);
            } else if(response.status === 422) {
                toast.error("Insufficient balance",{"theme":"colored"});
                throw new Error("Insufficient balance");   
            } else if(response.status === 404){
                toast.error("Receiver Not Found",{"theme":"colored"});
                throw new Error("Receiver Not Found");
            } else if(response.status === 400){
              toast.error("you can't send money to yourself",{"theme":"colored"});
              throw new Error("you can't send money to yourself");
            }
        })
        .catch((err) => {
            console.warn(err);
        })

        
    }

    return (  
        <div className="transfer-container">
        <div className="transfer-form">
          <h1>Transfer Money</h1>
          <br />
          <div className="form-group">
            <input
              type="number"
              value={receiverId}
              className="form-control"
              placeholder="Enter the Account Number of reciver"
              onChange={(e) => setReceiverId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={amount}
              className="form-control"
              placeholder="Enter the amount to be transferred"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary mb-3" onClick={handleTransfer}>
              Transfer Money
            </button>
          </div>
        </div>
      </div>
     );
}

export default TransferMoney;