import HomePage from "./pages/HomePage";
import "./style/App.css";
import 'react-toastify/dist/ReactToastify.css';
import "animate.css"



function App() {
  localStorage.setItem("isAuthenticated",false);

  return (
      <>
        <HomePage />
      </>
  );
}

export default App;
