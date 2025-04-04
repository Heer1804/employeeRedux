import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../redux/actions";
import { Container, Card, Button, Table, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function View() {
  const emp = useSelector((state) => state.employee || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteEmp = (index) => {
    dispatch(deleteEmployee(index));
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light overflow-auto"
      style={{ minHeight: "90vh" }}
    >
      <Card className="w-75 shadow-lg border-0" style={{ maxWidth: "100%" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "rgb(64, 64, 133)" }}>
            Employee List
          </h3>
          {Array.isArray(emp) && emp.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover bordered className="text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Hobbies</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emp.map((v, i) => (
                    <tr key={i}>
                      <td>{v.name || "N/A"}</td>
                      <td>{v.email || "N/A"}</td>
                      <td>{v.age || "N/A"}</td>
                      <td>{v.city || "N/A"}</td>
                      <td>{v.gender || "N/A"}</td>
                      <td>{v.role || "N/A"}</td>
                      <td>{Array.isArray(v.hobbies) ? v.hobbies.join(", ") : "None"}</td>
                      <td>
                        {v.image ? (
                          <Image
                            src={v.image}
                            alt="profile"
                            style={{ width: "80px", height: "60px", objectFit: "cover" }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/update/${i}`)}
                        >
                          <CiEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteEmp(i)}
                        >
                          <MdDelete />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted">No employees added yet.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default View;
