import * as React from "react";
import Topsection from "./Topsection";
import Midservices from "./Midservices";
function Home(props) {
  return (
    <form className="items-center flex flex-col justify-center px-16 py-11 max-md:px-5">
  <Topsection/>
<Midservices/>
    </form>


  );
}



export default Home;
