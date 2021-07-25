import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../../globalStyles";
import { AuthProvider } from "../../Context";

import {
  Nav,
  NavbarContainer,
  NavIcon,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavItemBtn,
  NavBtnLink,
  SignInButton,
} from "./Navbar.element";

const NavBar = (props) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  });
  window.addEventListener("resize", showButton);
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon />
            BoozeCart
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/services">Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/home-feed">Products</NavLinks>
            </NavItem>

            {props.isAutehnticated ? (
              <NavBtnLink to="/sign-up">
                <Button> Log Out</Button>
              </NavBtnLink>
            ) : (
              <NavItemBtn>
                <SignInButton>
                  <NavItem>
                    <NavLinks to="/user-auth">Sign In</NavLinks>
                  </NavItem>
                </SignInButton>
                {button ? (
                  <NavBtnLink to="/sign-up">
                    <Button> Sign Up</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to="/sign-up">
                    <Button fontBig primary>
                      Sign Up
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            )}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
