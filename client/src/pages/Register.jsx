import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';

const Register = () => {
    return <>
        <Row 
            style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            }}>
         
            <Col xs={6}>
            <h1>Register</h1>
            <Form>
                    <Form.Group className="mb-4 mt-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                            <Button variant="secondary" type="reset">
                                Reset
                            </Button>
                        </Stack>
                    </Row>
            </Form>
                <Alert variant='danger' className='mt-3'>
                    <p>An error occured when creating your account ...</p>
                </Alert>
                <Alert variant="info" className="mt-4">
                    Already have an account? <Alert.Link href="/login">Login</Alert.Link>
                </Alert>
            </Col>
        </Row>
    </>;
}
 
export default Register;