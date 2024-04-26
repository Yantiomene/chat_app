import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Login = () => {
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
          <Form>
            <Form.Group className="mb-4 mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Row>
              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button variant="secondary" type="reset">
                  Reset
                </Button>
              </Stack>
            </Row>
          </Form>
          <Alert variant="danger" className="mt-3">
            <p>Your Email or password is incorrect ...</p>
          </Alert>
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
