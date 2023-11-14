import { useEffect } from "react";
import BankInfo from "../components/BankInfo";
import NavBar from "../components/NavBar";


function HomePage() {
        localStorage.clear();
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("isAdmin", false);
    return ( 
        <>
        <NavBar />
        <BankInfo />
        </>
     );
}

export default HomePage;