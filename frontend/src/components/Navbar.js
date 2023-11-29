import * as React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css'
function Navbar(props) {
    return (<div className="justify-between border border-[color:var(--grey-15,#262626)] bg-zinc-900 self-stretch flex w-full gap-5 pl-16 pr-9 py-6 border-solid items-start max-md:max-w-full max-md:flex-wrap max-md:px-5">
    <div className="text-white text-3xl font-bold leading-8 grow whitespace-nowrap mt-5">
      PawPal Community
    </div>
    <div className="items-stretch self-center flex justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:justify-center">
    <Link to="/">
    <Button className="white-text text-lg leading-7 whitespace-nowrap">
    Home
    </Button>
    </Link>
    
    <Link to="/mission">
    <Button className="white-text text-lg leading-7">Our Mission</Button>
    </Link>
    <Link to="/services">
    <Button className="white-text text-neutral-200 text-lg font-medium leading-7">
        Services
      </Button>
    </Link>
    <Link to="/walker">
    <Button className="white-text text-neutral-200 text-lg font-medium leading-7 whitespace-nowrap">
        Become a Walker
      </Button>
    </Link>
    
    </div>
    
    <div className="items-center self-stretch flex justify-between gap-5">
    <Link to="/signup">
    <Button className="white-text text-lg leading-7 grow whitespace-nowrap my-auto">
        Sign Up
      </Button>
    </Link>
    <Link to="/login">
    <Button className="white-text text-zinc-900 text-lg leading-7 whitespace-nowrap items-center bg-amber-400 self-stretch grow justify-center px-5 py-3.5 rounded-[82px]">
        Login
      </Button>
    </Link>
    
    </div>
    </div>);
};
export default Navbar;
