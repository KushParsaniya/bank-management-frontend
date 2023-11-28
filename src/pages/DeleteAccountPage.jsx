import { useState } from "react";
import '../style/deleteaccount.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function DeleteAccount() {
    let api = "https://bank-management-backend-production.up.railway.app/delete";
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function deleteAccount() {
    if (email.length < 1 || password.length < 1) {
      alert("Please fill in all fields");
      return;
    }
    let item = { email, password };

    console.log(item);

    let result;

    await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(async (response) => {
        if (response.status === 200) {
          navigate("/home");
          toast.success("Successfully Deleted...", { theme: "colored" });
          result = await response.json();
          console.log(result);
        } else if (response.status === 404) {
          navigate("/close");
          toast.error("User not found", { theme: "colored" });
          throw new Error("User not found");
        } else if (response.status === 401) {
          navigate("/close");
          setEmail("");
          setPassword("");
          toast.error("Wrong Credentials", { theme: "colored" });
          throw new Error(response);
        }
        else if (response.status === 500) {
            toast.error("Internal Server Error", { theme: "colored" });
            throw new Error("Internal Server Error");
        }
      })
      .catch((err) => {
        console.log("error found");
      });
  }

  const goback = () => {
    navigate("..");
  }

    return (
        <div className="close-container">
            <div className="close-form">
                <h1>Close Account</h1>
                <br />
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-danger mb-3" onClick={deleteAccount}>
                            Close Account
                        </button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success mt-3" onClick={goback}>
                            Go Back
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default DeleteAccount;