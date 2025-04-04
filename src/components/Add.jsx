import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";
import { toast } from "react-toastify";

function Add() {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    email: "",
    hobbies: [],
    city: "",
    password: "",
    image: "",
    role: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInput = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    setError("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEmployee({ ...employee, image: reader.result });
      };
      setError("");
    }
  };

  const handleHobbies = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      hobbies: checked
        ? [...prev.hobbies, value]
        : prev.hobbies.filter((hobby) => hobby !== value),
    }));
    setError("");
  };

  const submitData = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    toast.dark("Employee added successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light pt-0"
      style={{ height: "1000px" }}
    >
      <Card
        className="w-100 shadow-lg border-0"
        style={{ maxWidth: "650px", overflow: "hidden" }}
      >
        <Card.Body className="p-5">
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "rgb(64 64 133)" }}
          >
            Add New Employee
          </h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitData}>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted"  >Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={getInput}
                    required
                    placeholder="Enter full name"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={getInput}
                    required
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={employee.password}
                    onChange={getInput}
                    required
                    placeholder="Enter password"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={employee.age}
                    onChange={getInput}
                    min="18"
                    max="100"
                    required
                    placeholder="Enter age"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Gender</Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={employee.gender === "Male"}
                      onChange={getInput}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      checked={employee.gender === "Female"}
                      onChange={getInput}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="gender"
                      value="Others"
                      checked={employee.gender === "Others"}
                      onChange={getInput}
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={10}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">City</Form.Label>
                  <Form.Select
                    name="city"
                    value={employee.city}
                    onChange={getInput}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Surat">Surat</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Pune">Pune</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={10}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={employee.role}
                    onChange={getInput}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                    <option value="Analyst">Analyst</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">
                    Profile Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    required
                  />
                  {employee.image && (
                    <div className="mt-3 text-center">
                      <Image
                        src={employee.image}
                        alt="Preview"
                        className="shadow-sm"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted">Hobbies</Form.Label>
                  <Row className="g-2">
                    {["Music", "Reading", "Coding", "Dancing"].map((hobby) => (
                      <Col xs={6} key={hobby}>
                        <Form.Check
                          type="checkbox"
                          label={hobby}
                          value={hobby}
                          checked={employee.hobbies.includes(hobby)}
                          onChange={handleHobbies}
                          className="text-dark"

                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Button
              type="submit"
              className="w-100 mt-4 fw-semibold"
              size="lg"
              style={{ backgroundColor: "rgb(120 127 182)", border: "none" }}
            >
              Add Employee
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Add;
