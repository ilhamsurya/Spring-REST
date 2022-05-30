import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.remove = this.remove.bind(this);
  }
  componentDidMount() {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }));
  }
  async remove(id) {
    await fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedUsers = [...this.state.users].filter((i) => i.id !== id);
      this.setState({ users: updatedUsers });
    });
  }
  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map((client) => {
      return (
        <tr key={client.id}>
          <td style={{ whiteSpace: "nowrap" }}>{client.name}</td>
          <td>{client.email}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/users/" + client.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(client.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">
              Add Client
            </Button>
          </div>
          <h3>Users</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="30%">Email</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
export default ClientList;
