import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../auth';

const TitleLink = styled(Link)`
  font-family: 'Fredoka One', cursive;
  font-size: 2rem; 
  color: #FFBA33; 

  &:hover {
    color: #fdd835; 
    text-decoration: none;
  }
`;

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useAuth();
  const navRef = useRef(); 

  let navLinks = [
    { id: "mission", title: "Mission" },
    { id: "services", title: "Services" },
  ];
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setToggle(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (currentUser) {
    navLinks = [...navLinks, 
                { id: "search", title: "Forum" },
                { id: "settings", title: "Settings" }];
  } else {
    navLinks = [...navLinks, 
                { id: "sign-up", title: "Sign Up" },
                { id: "login", title: "Login" }];
  }

  return (
    <nav className="w-full flex py-3 justify-between items-center navbar" ref={navRef}>
      <TitleLink to='/'>Pawpalcommunity</TitleLink>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"} ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}>
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
          src ="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
        />
        <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li key={nav.id} className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}>
                <Link to={`/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
