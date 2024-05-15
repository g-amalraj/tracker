import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser,FaChartBar,FaProjectDiagram ,FaAddressCard,FaUserCircle} from "react-icons/fa";
import { setAuthenticated, setCredentials } from "../features/checkInOut/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userInfo  = useSelector((state) => state.auth.userInfo);
  const isAuthenticated  = useSelector((state) => state.auth.isAuthenticated);
  const handleSignOut = () => {
     try {
      //console.log('in handle fn')
      localStorage.removeItem("token");
      console.log('hi')
      dispatch(setAuthenticated(false));
      dispatch(setCredentials(null));
      navigate("/login");
     
    } catch (err) {
      console.log("error");
    }
    };
    const trackr = userInfo ? '/home' : '/homes';
  return (
   <div>
      <Navbar style={{ backgroundColor: "#212529" }} variant="dark" expand="md" collapseOnSelect>
        <Container>
        <LinkContainer to={trackr}>
        <Navbar.Brand className="text-danger">Trackr</Navbar.Brand>
                  </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              {userInfo && (
                <>
                  <LinkContainer to='/dashboard'>
            <Nav.Link>
                <FaChartBar style={{ marginRight: '5px',fontSize: '1.1rem' }} />
                <span style={{ paddingRight: '10px',fontSize: '1.1rem'  }}>
                    Dashboard
                </span>
            </Nav.Link>
        </LinkContainer>
       <LinkContainer to='/project'>
            <Nav.Link>
                <FaProjectDiagram style={{ marginRight: '5px',fontSize: '1.1rem'  }} />
                <span style={{ paddingRight: '10px',fontSize: '1.1rem'  }}>
                    Project
                </span>
            </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/user'>
            <Nav.Link>
                <FaAddressCard style={{ marginRight: '5px',fontSize: '1.1rem'  }} />
                <span style={{ paddingRight: '10px',fontSize: '1.1rem'  }}>
                User
                </span>
            </Nav.Link>
        </LinkContainer>
          <LinkContainer to='/profile'>
              <Nav.Link>
                  <FaUserCircle style={{ marginRight: '5px',fontSize: '1.1rem'  }} />
                  <span style={{ paddingRight: '10px',fontSize: '1.1rem'  }}>
                      Profile
                  </span>
              </Nav.Link>
          </LinkContainer>
                </>
              )}
            </Nav>
            <Nav>
              {userInfo ? (
                <>
                
                  <Button variant="danger" onClick={handleSignOut}>
                    <RiLogoutCircleRLine />
                    <span className='p-1'>Sign Out</span>
                  </Button>
               
              </>
              ) : (
                <>
                 <LinkContainer to='/login'>
    <Button variant="danger">
      <FaUser /> Sign In
    </Button>
  </LinkContainer>
  </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default Header;
