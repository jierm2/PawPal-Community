import React from "react";
import { Box, Typography } from '@mui/material';
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";

function Footer(props) {
    // const theme = useTheme();

  return (
    <Box
    sx={{ marginTop:0,paddingTop:0 }}
    className="flex flex-colitems-center mt-12 max-md:max-w-full max-md:mt-10"
    component="div"
  >
      <Box
        className="flex-grow"
        component="div"
      >
        {/* All your page content goes here */}
      </Box>
      <Box
        className="w-full"
        component="div"
      >
      <header className="flex items-stretch justify-between gap-5">
       
      {/* <Typography
        variant="h6"
        sx={{
          color: 'white',
          [theme.breakpoints.up('sm')]: {
            variant: 'h4',
          },
        }}
      >
        PawPal Community
      </Typography> */}
      </header>
      <Box
        className="justify-center items-center self-stretch flex flex-col mt-12 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5"
        component="div"
      >
        <Box
          className="flex items-stretch gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center"
          component="div"
        >
          <Box className="items-center flex justify-between gap-1.5 rounded-md" component="div">
          <MdOutlineEmail style={{ color: "#FFBA33" }} size="1.5em" />

            <Typography
              className="text-zinc-200 text-lg leading-7 self-stretch grow whitespace-nowrap"
              component="div"
            >
              no-reply@pawpal.com
            </Typography>
          </Box>
          <Box className="items-center flex justify-between gap-1.5 rounded-md" component="div">
          <IoIosCall style={{ color: "#FFBA33" }} size="1.5em" />

            <Typography
              className="text-zinc-200 text-lg leading-7 self-stretch grow whitespace-nowrap"
              component="div"
            >
              +1 123 45 6789
            </Typography>
          </Box>
          
        </Box>
      </Box>
      <Box
        className="justify-between items-stretch self-stretch border border-[color:var(--grey-15,#262626)] flex w-full gap-5 mt-12 pl-4 pr-8 py-4 rounded-[100px] border-solid max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10 max-md:pr-5"
        component="div"
      >
       
        <Typography
          className="text-zinc-400 text-lg font-light leading-7 self-center grow shrink basis-auto my-auto"
          component="div"
        >
          PawPal Inc. All Rights Reserved
        </Typography>
        <Box className="items-stretch self-center flex gap-3 my-auto max-md:justify-center" component="div">
          <Typography
            className="text-zinc-400 text-lg font-light leading-7 whitespace-nowrap"
            component="div"
          >
            Privacy Policy
          </Typography>
          <Box className="bg-zinc-400 w-px shrink-0 h-[27px]" component="div" />
          <Typography
            className="text-zinc-400 text-lg font-light leading-7 whitespace-nowrap"
            component="div"
          >
            Terms of Service
          </Typography>
        </Box>
      </Box>
    </Box>
        </Box>

  );
}

export default Footer;
