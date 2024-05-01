import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);
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
          <h1>Login</h1>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-4 mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" type="submit">
                  {isLoginLoading ? "Getting you in..." : "Login"}
                </Button>
                <Button variant="secondary" type="reset">
                  Reset
                </Button>
              </Stack>
            </Row>
          </Form>
          {loginError?.error && (
            <Alert variant="danger" className="mt-3">
              <p>{loginError.message}</p>
            </Alert>
          )}
          <Alert variant="info" className="mt-4">
            Don't yet have an account?{" "}
            <Alert.Link href="/Register">Register</Alert.Link>
          </Alert>
        </Col>
      </Row>
    </>
  );
};

export default Login;
