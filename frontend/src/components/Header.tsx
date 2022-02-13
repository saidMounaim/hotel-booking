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
          <Nav className="ml-auto align-items-center">
            {userInfo ? 
            <NavDropdown className="dropdown-avatar" title={
              <div className="d-flex align-items-center">
                <Image className="avatar" src={userInfo.avatar ? userInfo.avatar : `/uploads/user-default.jpg`} alt="Avatar" />
                {userInfo.name}
              </div>
            } id="basic-nav-dropdown">
              <LinkContainer to="/bookings/me">
                <NavDropdown.Item>My Bookings</NavDropdown.Item>
              </LinkContainer>
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
            {userInfo && userInfo.isAdmin && (
              <NavDropdown className="ms-4 dropdown-avatar" title="Admin" id="basic-nav-dropdown">
                <LinkContainer to="/admin/rooms">
                  <NavDropdown.Item>Rooms</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/bookings">
                  <NavDropdown.Item>Bookings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
