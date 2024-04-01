import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';



function Home(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser); 
    });

    return unsubscribe;
  }, [auth]);


  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false); 
      // history.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <div>

      <Navbar bg="primary" expand="lg" className="navbar-dark">
        <Container fluid>
          <Navbar.Brand href="#">Cosmetics Demystified</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-scroll" />
          <Navbar.Collapse id="navbar-scroll">
            <Nav className="ms-auto"> 
              {isLoggedIn ? (
                <>
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <Link to="/health-dashboard" className="nav-link">
                    Health Dashboard
                  </Link>
                  <Link to="/about" className="nav-link">About Us</Link>
                  <Link to="/login" className="nav-link">Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Signup</Link>
                  <Link to="/about" className="nav-link">About Us</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2> */}
    </div>
  );
}

export default Home;