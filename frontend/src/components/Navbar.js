import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const Nav = styled.nav`
  // background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1200px) / 2);
  z-index: 10;
`;


const BaseLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #fdd835; 
  }
`;

const NavLink = styled(BaseLink)`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #FFBA33;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const slideDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const DropdownMenu = styled.div`
  display: none;
  background-color: #f9f9f9;
  position: absolute;
  top: 80px; // Adjusted to align with the Nav height
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    animation: ${slideDown} 0.3s ease-out;
  }
`;

const DropdownItem = styled(BaseLink)`
  color: black;
  padding: 12px 16px;

  &:hover {
    background-color: #f1f1f1;
  }
`;
const TitleLink = styled(NavLink)`
  font-family: 'Fredoka One', cursive;
  font-size: 2.5rem; // Adjust the size as needed
  color: #FFBA33; // Your chosen color

  &:hover {
    color: #fdd835; // Color for hover state
    text-decoration: none;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Nav>
      <TitleLink to='/'>
    Pawpalcommunity
  </TitleLink>
        <Bars onClick={() => setIsOpen(!isOpen)} />
        <NavMenu>
          <NavLink to='/mission' activeStyle onClick={closeMenu}style={{ textDecoration: 'line-through' }}>
            Our Mission
          </NavLink>
          <NavLink to='/services' activeStyle onClick={closeMenu}style={{ textDecoration: 'line-through' }}>
            Services
          </NavLink>
          <NavLink to='/walker' activeStyle onClick={closeMenu} style={{ textDecoration: 'line-through' }}>
            Become a Walker
          </NavLink>
          <NavLink to='/sign-up' activeStyle onClick={closeMenu} >
            Sign Up
          </NavLink>
        </NavMenu>
        <DropdownMenu isOpen={isOpen}>
          <DropdownItem to='/mission' onClick={closeMenu}>
          Our Mission
          </DropdownItem>
          <DropdownItem to='/services' onClick={closeMenu}>
            Services
          </DropdownItem>
          <DropdownItem to='/walker' onClick={closeMenu}>
            Become a Walker
          </DropdownItem>
          <DropdownItem to='/login' onClick={closeMenu}>
            Login
          </DropdownItem>
          <DropdownItem to='/sign-up' onClick={closeMenu}>
            Sign Up
          </DropdownItem>
        </DropdownMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Login</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
