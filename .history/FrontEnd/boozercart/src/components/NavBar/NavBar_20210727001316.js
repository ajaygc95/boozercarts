import React, { useEffect, useState, useContext } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { Button } from "../../globalStyles";
import { authAxios } from "../../Utils";
import { logout } from "../Context/Action/Action";
import { useAuthDispatch, useAuthState } from "../Context/AuthContext";
import { useCartDispatch, useCartState } from "../Context/CartContext";
import { CartItemDetail } from "../../../src/constants";

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
  CartButton,
  CartItemLabel,
  ShoppingCartIcon,
  ProfileIconWrapper,
} from "./NavBar.element";
import { getInitialCartItem } from "../Context/Action/cartAction";
import LeftBar from "./LeftBar/LeftBar";

const NavBar = (props) => {
  const token = localStorage.getItem("token");
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const [cartItems, setCartItems] = useState(0);
  const [counter, setCounter] = useState(0);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const cartDispatch = useCartDispatch();
  const items = useCartState();

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { is_authenticated, loading, errorMessage } = useAuthState(); //read the values of loading and errorMessage from context
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

  // useEffect(() => {
  //   console.log("This has been called as well");
  //   getInitialCartItem(cartDispatch);
  // }, [items.totalItems]);

  useEffect(() => {
    console.log("Use effect called every 5 sec");
    getInitialCartItem(cartDispatch);
    showButton();
  }, []);
  window.addEventListener("resize", showButton);
  return (
    <>
      <Nav>
        <NavbarContainer>
          {token && token != "" && token != undefined ? (
            <NavLogo to="/dashboard">
              <NavIcon />
              BoozerCart
            </NavLogo>
          ) : (
            <NavLogo to="/">
              <NavIcon />
              BoozerCart
            </NavLogo>
          )}

          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            {token && token != "" && token != undefined ? (
              <>
                <CartButton to="/cart">
                  <ShoppingCartIcon>
                    <FaShoppingCart></FaShoppingCart>
                  </ShoppingCartIcon>

                  <CartItemLabel>{items.totalItems}</CartItemLabel>
                </CartButton>

                <NavBtnLink>
                  {/* <Button onClick={handleLogout}> */}
                  <ProfileIconWrapper onClick={handleLogout}>
                    <CgProfile></CgProfile>
                  </ProfileIconWrapper>
                  {/* </Button> */}
                </NavBtnLink>
              </>
            ) : (
              <>
                {/* <NavItem>
                  <NavLinks to="/">Home</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="/services">Services</NavLinks>
                </NavItem>

                <NavItem>
                  <NavLinks to="/home-feed">Products</NavLinks>
                </NavItem> */}

                <NavItemBtn>
                  <SignInButton>
                    <NavItem>
                      <NavLinks to="/sign-in">Sign In</NavLinks>
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
              </>
            )}
          </NavMenu>
        </NavbarContainer>
      </Nav>
      <LeftBar></LeftBar>
    </>
  );
};

export default NavBar;
