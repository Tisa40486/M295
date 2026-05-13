import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { isLoggedIn } from "./api";

function App() {
  const [isLogged, setIsLogged] = useState(isLoggedIn());

  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [isLogged]);

  return (
    <Router>
      <AppNavbar />
      <Container className="mt-3">
        <Routes>
          <Route
            exact
            path="/"
            element={isLogged ? <Home /> : <Navigate replace to={"/login"} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/login"
            element={<Login isLogged={setIsLogged} />}
          />
          <Route
            exact
            path="/profile"
            element={
              isLogged ? <Profile /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            exact
            path="/profile/edit"
            element={
              isLogged ? <EditProfile /> : <Navigate replace to={"/login"} />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
