import { useState , useEffect } from "react";
import '../style/signup.css'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function LoanApply() {
    let navigate = useNavigate();

    const [loanAmount, setloanAmount] = useState("");
    const [loanType, setloanType] = useState("");

    const storedData = localStorage.getItem("data");
    const parseData = JSON.parse(storedData);

    const accountId = parseData && parseData.accountId;

    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") == 'false' || localStorage.getItem("isAdmin") == 'true') {
          navigate("/login");
          return;
        }   
      }, []);

    // for backend compatibility
    let URL = `https://${URL}/account/info/loans/applyLoan`;

    async function createAccount() {
        if (loanType.length < 1 || loanAmount < 1 || accountId < 1) {
            alert("Please fill in all fields");
            return;
        }

        let item = { accountId, loanAmount, loanType };
        console.warn(item);

        await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization":localStorage.getItem("Authorization"),
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item),
        })
            .then(async (response) => {
                if (response.status === 200) {
                    toast.success("Successfully applied...", { theme: "colored" });
                    navigate(-1);
                    return;
                }
                else if (response.status === 500) {
                    toast.error("Internal Server Error", { theme: "colored" });
                    throw new Error("Internal Server Error");
                } else if (response.status === 404) {
                    toast.error("User not found", { theme: "colored" });
                    throw new Error("User not found");
                }
            })
            .catch((err) => {
                console.warn("error found" + err);
            });
    }



    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1>Apply for Loan</h1>
                <br />
                <label
                    className="label-primary mb-5"
                >Loan Type :</label>
                <select
                    defaultValue="SELECT TYPE"
                    onChange={(ev) => setloanType(ev.target.value)}
                    className="browser-default custom-select"
                >
                    <option value="SELECT TYPE">Select Type</option>
                    <option value="HOME" >Home Loan</option>
                    <option value="CAR">Car Loan</option>
                    <option value="STUDENT">Student Loan</option>
                    <option value="PERSONAL">Personal Loan</option>
                    <option value="BUSINESS">Business Loan</option>
                </select>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="amount"
                        value={loanAmount}
                        onChange={(ev) => setloanAmount(ev.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="expected Interest Rate :"

                    />
                </div>
                <br />
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" onClick={createAccount}>
                        Apply For Loan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoanApply;