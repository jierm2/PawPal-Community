import * as React from "react";
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CheckIcon from '../../images/check.svg';
import DogImg from '../../images/dogHome.jpg'; 
import styled from 'styled-components';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd835', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: 'white', // Text color
          },
          '& label': {
            color: 'gray', // Label color
          },
          '& label.Mui-focused': {
            color: 'white', // Label color when the input is focused
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'gray', // Underline color before input is touched
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white', // Underline color when input is focused
          },
        },
      },
    },
  },
});

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px; // Adds rounded corners to the container
  img {
    display: block; // Ensures that the image is block level to fill the container
    width: 100%; // Ensures the image is always full width of the container
    height: auto; // Keeps the image's aspect ratio
    border-radius: 20px; // Adds rounded corners to the image
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px; // Ensures the gradient follows the rounded corners
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.2), // Starting with a semi-transparent black
      rgba(0, 0, 0, 0.7) 70%, // Transitioning to a more opaque black
      #000 100% // Ending with solid black
    );
    z-index: 1;
  }
`;


function Topsection(props) {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full max-w-[1244px] mt-12 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[45%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col pb-12 items-start max-md:max-w-full max-md:mt-10">
              <div
                className="items-stretch bg-neutral-800 flex gap-1.5 pl-3.5 pr-5 py-2.5 rounded-[61px]"
                role="button"
                aria-label="Background check"
              >
                <img
                  loading="lazy"
                  src={CheckIcon}
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  alt="Background check"
                />
                <span className="text-white text-lg font-light leading-6 grow whitespace-nowrap">
                  Background check
                </span>
              </div>
              <div className="self-stretch text-amber-400 text-4xl font-medium leading-[58px] mt-5 max-md:max-w-full">
                <span className="text-white"> Welcome to PawPal Community </span>
                <br />
                <span className="text-amber-400">Connecting</span>
                <span className="text-white"> Dog Lovers for a </span>
                <span className="text-amber-400">Happier, Healthier</span>
                <span className="text-white"> </span>
                <span className="text-amber-400">Pet </span>
                <span className="text-white">Experience</span>
              </div>
              <div className="self-stretch text-neutral-400 text-lg font-light leading-7 mt-3.5 max-md:max-w-full">
                Join PawPal Community to connect with trusted dog walkers or share your passion for
                pets by providing care. Our community-driven platform makes pet care easy,
                affordable, and reliable.
              </div>
              
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              aria-label="Join Now"
              sx={{
                marginTop: '16px',
                borderRadius: '50px', // This makes the button rounded
                width: 'auto', // You can set this to any width you like, for example '200px'
                maxWidth: '300px', // You can also set a maxWidth to ensure it doesn't stretch too much on larger screens
                padding: '8px 30px', // Adjust padding to increase button size
              }}  component={Link} to="/sign-up"         >
                Join Now
            </Button>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[55%] ml-5 max-md:w-full max-md:ml-0">
          <ImageContainer>
            <img
              loading="lazy"
              src={DogImg}
              alt="PawPal Community"
            />
          </ImageContainer>
        </div>
        </div>
      </div>
      </ThemeProvider>
  );
}

export default Topsection;
