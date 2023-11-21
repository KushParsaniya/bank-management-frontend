import { useState, useEffect } from "react";
import "../../style/admindeposit.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DepositMoney() {
  let navigate = useNavigate();
  const [accountId, setaccountId] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("isAuthenticated") == "false" ||
      localStorage.getItem("isAdmin") == "false" ||
      !localStorage.getItem("isAdmin") == undefined
    ) {
      navigate("/login");
      return;
    }
  }, []);

  async function handleDeposit() {
    if (accountId < 1 || amount < 0) {
      toast.error("Please enter valid field value", { theme: "colored" });
      return;
    }
    let item = { accountId, amount };

    let api = `http://localhost:8080/account/info/deposit`;

    await fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(async (response) => {
        if (response.status === 200) {
          toast.success("successfully deposit", { theme: "colored" });

          return;
        } else if (response.status === 404) {
          toast.error("account not found", { theme: "colored" });
          throw new Error("Account not found");
        } else if (response.status === 500) {
          toast.error("Internal Server Error", { theme: "colored" });
          throw new Error("Internal Server Error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="adeposit-container">
      <div className="adeposit-form">
        <h1>Deposit</h1>
        <br />
        {/* <form> */}
        <div className="form-group">
          <input
            type="number"
            value={accountId}
            className="form-control"
            placeholder="Account Id"
            onChange={(e) => setaccountId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            value={amount}
            className="form-control"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <br />
        <div className="text-center">
          <button className="btn btn-primary mb-3" onClick={handleDeposit}>
            Deposit
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default DepositMoney;
