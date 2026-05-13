import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { createUser } from "../api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({
        email,
        password,
        firstname,
        lastname,
        role,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setModalText(response.data.message);
      handleShow();
    } catch (error) {
      console.error(error.response.data.message);
      setModalText(error.response.data.message);
      handleShow();
    }
  };

  return (
    <>
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
        <Form.Group controlId="firstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre Prénom"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre Nom"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Rôle</Form.Label>
          <Form.Select
            aria-label="Sélection du rôle"
            onChange={(event) => setRole(event.target.value)}>
            <option>Rôle...</option>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          S'inscrire
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;
