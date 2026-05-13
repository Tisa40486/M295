import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/api/users/me", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>
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
        <Form.Label>Nouveau mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre nouveau mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
}

export default EditProfile;
