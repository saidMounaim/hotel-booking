import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { logout } from '../redux/actions/UserActions';


const Header: React.FC = () => {


  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin); 

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Navbar bg="primary" variant="dark" >
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Navbar.Brand>Hotel Book</Navbar.Brand>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto">
            {userInfo ? 
            <NavDropdown className="dropdown-avatar" title={
              <div className="d-flex align-items-center">
                <Image className="avatar" src={userInfo.avatar} alt="Avatar" />
                {userInfo.name}
              </div>
            } id="basic-nav-dropdown">
              <LinkContainer to="/account/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/account/password">
                <NavDropdown.Item>Password</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            :         
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
