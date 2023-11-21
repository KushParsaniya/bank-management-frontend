import React, { useEffect } from "react";
import { Container,  Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserInfo from "./../cards/UserInfo";
import TransactionTable from "./../cards/TransactionTable";
import Cards from "./../cards/Cards";
import "../style/accountinfo.css"
import { toast } from "react-toastify";

const buttonStyle = {
  backgroundColor: "#007BFF",
  borderColor: "#007BFF",
  color: "white",
  marginRight: "10px",
};


const AccountInfo = () => {
  let navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("data");
    localStorage.setItem("isAuthenticated", false);
    navigate("/home");
  }
  async function fetchData() {
    const storedData =  localStorage.getItem("data");
    const parseData = await JSON.parse(storedData);

    const storedSender = await parseData && parseData.accountId;
    console.log(storedSender);
    let api = await `http://localhost:8080/account/info/getByAccountId/${storedSender}`;
      await fetch(api, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          "Accept": "*/*",
        },
      }).then(async (response) => {
        if (response.status === 200) {
          let result = await response.json();
          console.warn(result);
          // console.log("hello")
          // localStorage.clear();
          // localStorage.setItem("isAuthenticated",true);
          localStorage.setItem("data", JSON.stringify(result));
        } else if (response.status === 404) {
          toast.error("Loading...",{"theme":"colored"})
        }
      }).catch((error) => {
        console.error(error);
      });
    }

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == 'false' || localStorage.getItem("isAdmin") == 'true') {
      navigate("/login");
      return;
    }   
    fetchData();
  }, []);


  return (
    <Container>
      <UserInfo />
      <TransactionTable />
      <Cards />
      <div className="text-center">
        <Button style={buttonStyle} onClick={logout}>
          Log Out
        </Button>
      </div>
    </Container>
  );
};

export default AccountInfo;
