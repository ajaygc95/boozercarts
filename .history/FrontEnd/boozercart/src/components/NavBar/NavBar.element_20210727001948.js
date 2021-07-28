import styled from "styled-components";
import { Container } from "../../globalStyles";
import { Link } from "react-router-dom";
import { FaBeer, FaMagento } from "react-icons/fa";

export const Nav = styled.nav`
  background: #101522;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  color: white;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export const NavIcon = styled(FaBeer)`
  margin-right: 0.5rem;
  color: white;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    display: block;
    position: absolute;
    right: 10px;
    line-height: 65px;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 65px;
    left: ${({ click }) => (click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.3s ease;
    background: #101522;
  }
`;
export const NavItemBtn = styled.li`
  display: flex;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    width: 100%;
    height: 120px;
  }
`;

export const NavItem = styled.li`
  height: 65px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #0467fb;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    background: red;
    margin-left: auto;
    align-items: center;
    &:hover {
      border: none;
    }
  }
`;


export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  &:hover {
    color: #0467fb;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;
export const CartButton = styled(Link)`
  border-radius: 20px;
  background: white;
  padding: 5px 24px;
  display: felx;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: white;

  &:hover {
    color: green;
  }
  &:visited {
    color: black;
  }

  @media screen and (max-width: 768px) {
    background: orange;
    width: 80%;
    border-radius: 0px;
    padding: 10px 10px;
    margin-top: 40px;
  }
`;

export const ShoppingCartIcon = styled.div`
  font-size: 2rem;
  color: green;
`;

export const CartItemLabel = styled.text`
  font-size: 1.5rem;
  color: green;
`;


export const ProfileIconWrapper = styled.div`
  font-size: 2rem;
`;
