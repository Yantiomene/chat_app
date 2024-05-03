import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <Nav.Link href="/">Blood+ Chat</Nav.Link>
        <span className="text-warning">
          {user ? user.name : "Hello"}, welcome to blood donation chat app!
        </span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user ? (
              <Link to="/profile" className="link-light">
                Profile
              </Link>
            ) : null}
            {user ? (
              <Link to="/chat" className="link-light">
                Chat
              </Link>
            ) : null}
            {user ? (
              <Link to="/donate" className="link-light">
                Donate
              </Link>
            ) : null}
            {user ? (
              <Link to="/request" className="link-light">
                Request
              </Link>
            ) : null}
            {user ? (
              <Link
                to="/logout"
                className="link-light"
                onClick={() => logoutUser()}
              >
                Logout
              </Link>
            ) : null}
            {!user && (
              <>
                <Nav.Link href="/login" className="link-light">
                  Login
                </Nav.Link>
                <Nav.Link href="/register" className="link-light">
                  Register
                </Nav.Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
