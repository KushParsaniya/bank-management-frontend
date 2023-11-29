import { useState } from "react";
import '../style/signup.css'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import reportWebVitals from './../reportWebVitals';



function SignUpPage() {
    let navigate = useNavigate();
    let path = "/home";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setaccountType] = useState("");

    // for backend compatibility
    let postUri = `https://${URL}/create`;

    async function createAccount() {
       
        if (username.length < 1 || email.length < 1 || password.length < 1 || accountType.length < 1 ||  accountType === "SELECT TYPE") {
            toast.error("Please fill in all fields",{theme:"colored"});
            return;
        }
        let item = { username, email, password, accountType };
        console.warn(item);
        let result;

        await fetch(postUri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Accept" : "application/json",
            },
            body: JSON.stringify(item),
            // mode: 'no-cors'
        })
        .then(async (response) => {
            if (response.status === 200) {
                toast.success("Successfully created...", { theme: "colored" });
                navigate(path);
                result = await result.json();
                console.warn("result : ", result);   
            }
            else if (response.status === 409) {
                setEmail("");
                setPassword("");
                toast.error("User already exists", { theme: "colored" });
                throw new Error("User already exists");
            } 
            else if (response.status === 500) {
                toast.error("Internal Server Error", { theme: "colored" });
                throw new Error("Internal Server Error");
            }
    
        })
        .catch((err) => {
            console.warn("error found");   
        });
    }



    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1>Create Account</h1>
                <br />
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                    </div>
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
                    <label
                        className="label-primary mb-5"
                    >Account Type :</label>
                    <select
                        defaultValue="SELECT TYPE"
                        onChange={(ev) => setaccountType(ev.target.value)}
                        className="browser-default custom-select"
                        >
                        <option value="SELECT TYPE">Select Type</option>
                        <option value="SAVING" >Saving Account</option>
                        <option value="CURRENT">Current Account</option>
                        <option value="BUSINESS">Business Account</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={createAccount}>
                            Create Account
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default SignUpPage;