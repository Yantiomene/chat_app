import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Col xs={6}>
          <h1>Register</h1>
          <Form onSubmit={registerUser}>
            <Form.Group className="mb-4 mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4 mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    comfirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Row>
              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" type="submit">
                  {isRegisterLoading ? "Loading..." : "Register"}
                </Button>
                <Button variant="secondary" type="reset">
                  Reset
                </Button>
              </Stack>
            </Row>
          </Form>
          {
            // Display the error message if there is an error
            registerError?.error && (
              <Alert variant="danger" className="mt-3">
                <p>{registerError?.message}</p>
              </Alert>
            )
          }
          <Alert variant="info" className="mt-4">
            Already have an account?{" "}
            <Alert.Link href="/login">Login</Alert.Link>
          </Alert>
        </Col>
      </Row>
    </>
  );
};

export default Register;
