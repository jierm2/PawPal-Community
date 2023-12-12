import * as React from "react";
import hello from '../../images/dogMission.png'; 
import "./Mission.css"

function Mission(props) {
  return (    
    <div className="self-stretch text-amber-400 text-3xl font-medium leading-[58px] mt-5 max-md:max-w-full"> 
      {/* <span className="text-white"> hello.</span> */}
      <div className="about-page-desktop">
      <div className="div">
        <div className="container">
          <div className="sub-container">
            <div className="text-container">
              <div className="text">Welcome to PawPal Community.</div>
              <p className="heading">
                <span className="text-wrapper">Where Pet Care Meets </span>
                <span className="span">Compassion!</span>
              </p>
            </div>
            <p className="paragraph">
              At PawPal Community, we believe that every dog deserves love and every dog lover should have the chance to
              share their affection. As a trusted companion for your pet care needs, we are committed to delivering
              exceptional services that go beyond expectations. We offer a unique platform, building connections and
              enriching lives, both human and canine. Join us on this exciting journey and discover a new level of pet
              care excellence.
            </p>
          </div>
          <img className="image" alt="multicolor dog mission" src={hello} style={{ width: '100%' }}/>
        </div>
    </div>
    </div>
    </div>
  );
}

export default Mission;