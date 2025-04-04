import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "../redux/actions";
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


function Update() {
  const { id } = useParams();
  const empList = useSelector((state) => state.employee || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    const empIndex = parseInt(id, 10);
    if (empList && empList.length > empIndex && empIndex >= 0) {
      const selectedEmployee = empList[empIndex];
      setEmployee({
        ...selectedEmployee,
        hobbies: Array.isArray(selectedEmployee.hobbies)
          ? [...selectedEmployee.hobbies]
          : [],
      });
    } else {
      setError("Employee not found");
      navigate("/");
    }
  }, [empList, id, navigate]);

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
        setEmployee((prev) => ({ ...prev, image: reader.result }));
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
        : prev.hobbies.filter((h) => h !== value),
    }));
    setError("");
  };

  const updateData = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployee({ id: parseInt(id, 10), updatedEmployee: employee })
    ); toast.dark("Employee added successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center bg-light pt-0" style={{ height: "1000px" }}>
      <Card className="w-100 shadow-lg border-0" style={{ maxWidth: "650px", overflow: "hidden" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "rgb(64, 64, 133)" }}>Update Employee</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={updateData}>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={employee.name} onChange={getInput} required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={employee.email} onChange={getInput} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={employee.password} onChange={getInput} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" name="age" value={employee.age} onChange={getInput} min="18" max="100" required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={employee.gender === "Male"}
                      onChange={getInput}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      checked={employee.gender === "Female"}
                      onChange={getInput}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Others"
                      name="gender"
                      value="Others"
                      checked={employee.gender === "Others"}
                      onChange={getInput}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={10}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Select name="city" value={employee.city} onChange={getInput} required>
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
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={employee.role} onChange={getInput} required>
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
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImage} />
                  {employee.image && (
                    <div className="mt-2 text-center">
                      <Image src={employee.image} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Hobbies</Form.Label>
                  <Row>
                    {["Music", "Reading", "Coding", "Dancing"].map((hobby) => (
                      <Col xs={6} key={hobby}>
                        <Form.Check
                          type="checkbox"
                          label={hobby}
                          value={hobby}
                          checked={employee.hobbies.includes(hobby)}
                          onChange={handleHobbies}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="w-100 mt-4" style={{ backgroundColor: "rgb(120, 127, 182)", border: "none" }}>Update Employee</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Update;
