import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { TextField } from "@mui/material";
import { Button, IconButton, Input } from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./Home.module.css";

function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [imageFile, setImageFile] = useState(null);

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
      console.error("Error signing out:", error);
    }
  };

  const handleChange = (event) => {
    setIngredients(event.target.value);
    if (imageFile) {
      event.target.disabled = true;
    } else {
      event.target.disabled = false;
    }
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    setImageFile(event.target.files[0]);
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" className="navbar-dark">
        <Container fluid>
          <Navbar.Brand href="#">Cosmetics Demystified</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-scroll" />
          <Navbar.Collapse id="navbar-scroll">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/health-dashboard" className="nav-link">
                    Health Dashboard
                  </Link>
                  <Link to="/about" className="nav-link">
                    About Us
                  </Link>
                  <Link to="/login" className="nav-link">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                  <Link to="/about" className="nav-link">
                    About Us
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2> */}

      <div className={styles.ingredientInputWrapper}>
        <TextField
          label="Ingredients"
          placeholder="Enter your ingredients!"
          multiline
          sx={{ width: "50%", margin: "0 auto" }}
          margin="normal"
          value={ingredients}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            style: {
              backgroundImage: imageFile
                ? `url(${URL.createObjectURL(imageFile)})`
                : "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              height: "300px",
            },
          }}
        />

        <Input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
          id="imageInput"
        />
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            component="span"
            sx={{ width: "150px" }}
            onClick={() => document.getElementById("imageInput").click()}
          >
            Upload Image
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
