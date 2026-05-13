import { useState, useEffect } from "react";
import { getUsers } from "../api";
import Table from "react-bootstrap/Table";

function Home() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");

  const handeProfile = async () => {
    try {
      const response = await getUsers(localStorage.getItem("userId"));
      setUsers(response.data.user);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    handeProfile();
  }, []);

  if (!users) {
    return <div>{error}</div>;
  }

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
        </tr>
      </thead>
      <tbody>
        {users.map((data) => {
          return (
            <tr>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Home;
