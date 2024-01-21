import { useState } from "react";
import "../style/loginpage.css";
import { useNavigate , useHistory } from "react-router-dom";
import { toast } from "react-toastify";


function LoginPage() {
  localStorage.clear();
  localStorage.setItem("isAuthenticated", false);
  localStorage.setItem("isAdmin", false);
  
  let api = `https://${process.env.REACT_APP_URL}/login`;
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email.length < 1 || password.length < 1) {
      toast.error("Please fill all the fields",{"theme":"colored"});
      return;
    }
    let item = { email, password };

    console.warn(item);
    const stringToEncode = `${email}:${password}`;
    const base64Encode =  btoa(stringToEncode);
    const authHeader = 'Basic ' + base64Encode;
    localStorage.setItem('Authorization', authHeader);
    let result;
    

    await fetch(api, {
      method: "POST",
      headers: {
        'Authorization' : localStorage.getItem("Authorization") ,
        "Content-Type": "application/json",
        // "Accept": "application/json",
      },
      body: JSON.stringify(item),
      // mode: 'no-cors'
      // mode: 'opaque'
    })
    // axios.post(api,{
    //   headers: {
    //     'Authorization' : authHeader ,
        // "Content-Type": "application/json",
    //   },
    //   body : JSON.stringify(item)
      
    // })
      .then(async (response) => {
        if (response.status === 200) {
          // console.log("hello")
          // navigate("/account/info");
          toast.success("Login Successfully...", { theme: "colored" });
          result = await response.json();
          localStorage.setItem("data", JSON.stringify(result));
          localStorage.setItem("isAuthenticated", true);
          const storedData = localStorage.getItem("data");
          const parseData = await JSON.parse(storedData);
          const role = parseData.role;
          if (role == "ADMIN"){
              localStorage.setItem("isAdmin", true);
              navigate("/admin/info");
          } else {
            localStorage.setItem("isAdmin", false);
            navigate("/account/info");
          }
          console.warn(result);
        } else if (response.status === 404) {
          navigate("/login");
          // alert("user not found");
          toast.error("User not found", { theme: "colored" });
          throw new Error("User not found");
        } else if (response.status === 401) {
          navigate("/login");
          setEmail("");
          setPassword("");
          toast.error("Wrong Credentials", { theme: "colored" });
          throw new Error(response);
        } else if (response.status === 500) {
          toast.error("Internal Server Error", { theme: "colored" });
          throw new Error("Internal Server Error");
        }
      })
      .catch((err) => {
        console.warn("error found",err);
      });
    // result = await result.json();
  }

  // sign up button
  function navToSignUp() {
    navigate("/signup");
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <br />
        {/* <form> */}
        <div className="form-group">
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary mb-3" onClick={handleLogin}>
            Log In
          </button>
          <h6 className="mb-2">Don't Have Account</h6>
          <button className="btn btn-primary" onClick={navToSignUp}>
            Sign Up
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default LoginPage;
