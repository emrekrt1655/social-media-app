import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar
          user={{
            userId: "u123456",
            userName: "devwizard",
            name: "Alice",
            surname: "Johnson",
            bio: "Frontend developer with a love for TypeScript and beautiful UIs.",
            email: "alice.johnson@example.com",
            password: "hashedpassword123",
            avatar: "https://i.pravatar.cc/150?img=47",
          }}
          accessToken=""
        />
      <main className="page-content">
</main>
       
      </BrowserRouter>
    </>
  );
}

export default App;
