import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { getUserProfile } from "../api";
import { updateUserProfile, deleteUserById, logout } from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [modifyProfile, setModifyProfile] = useState(0);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handeProfile = async () => {
    try {
      const response = await getUserProfile(localStorage.getItem("userId"));
      setUser(response.data);
      setEmail(response.data.email);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleModifyProfile = async () => {
    try {
      await updateUserProfile(localStorage.getItem("userId"), {
        email: email,
        firstname: firstname,
        lastname: lastname,
      });
      setModifyProfile(0);
      handeProfile();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(localStorage.getItem("userId"));
      logout();
      window.location.reload(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    handeProfile();
  }, []);

  if (!user) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <>
      {modifyProfile === 0 ? (
        <div>
          <h1>
            Profil de {user.firstname} {user.lastname}
          </h1>
          <p>Adresse e-mail : {user.email}</p>
          <p>Rôle : {user.role}</p>
          <Button
            variant="primary"
            type="button"
            onClick={() => setModifyProfile(1)}>
            Modifier
          </Button>
          &nbsp;
          <Button
            variant="danger"
            type="button"
            onClick={() => handleDeleteUser()}>
            Supprimer
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleModifyProfile}>
          <Form.Group controlId="email">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <br />
          <Button variant="success" type="submit">
            Sauvegarder
          </Button>
        </Form>
      )}
    </>
  );
}

export default Profile;
