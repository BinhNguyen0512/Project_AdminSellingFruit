import React from 'react'
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../../slice/userSlice';

const Header = (props) => {

  const auth = useSelector(state => state.user.authenticate)
  const dispatch = useDispatch()

  const logout = () => {
    console.log('abc')
    dispatch(signout())
  }
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span className='nav-link' onClick={() => logout()}>Signout</span>
        </li>
      </Nav>
    )
  }

  const renderNonLoggedLinks = () => {
    return(
      <Nav>
            <li className='nav-item'>
              <NavLink to='/signin' className='nav-link' >Signin</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/signup' className='nav-link'>Signup</NavLink>
            </li>
      </Nav>
    )
  }
  return (
    <Navbar bg="light" fixed='top' expand="lg" style={{zIndex: '1'}}>
      <Container fluid>
        <Link to='/' className='navbar-brand'>Admin Dashboard</Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth ? renderLoggedInLinks() : renderNonLoggedLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header
