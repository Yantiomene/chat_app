import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <Nav.Link href="/">Blood+ Chat</Nav.Link>
                <span className="text-muted">A chat application for blood donors</span>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        <Nav.Link href="/login"className='link-light'>Login</Nav.Link>
                        <Nav.Link href="/register" className="link-light">Register</Nav.Link>
                    </Stack>
                </Nav>
            </Container>
        </Navbar>;
}
 
export default NavBar;