import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import NavBar from './components/NavBar'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Chat/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
