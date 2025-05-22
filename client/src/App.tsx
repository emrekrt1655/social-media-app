import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.scss";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { user, accessToken } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        
          <Navbar user={user} accessToken={accessToken!} />
          <main className="page-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <main className="page-content">Main Page</main>
      </BrowserRouter>
    </>
  );
}

export default App;
