import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login, isLoggedIn } from "../api";
import { useNavigate } from "react-router-dom";

function Login({ isLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.userId);
      isLogged(isLoggedIn);
      navigate("/profile");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Adresse e-mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre adresse e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Se connecter
      </Button>
    </Form>
  );
}

export default Login;
