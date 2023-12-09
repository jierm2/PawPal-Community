//moved services from homepage onto here

import * as React from "react";
import "./Services.css"
import DogIcon from '@mui/icons-material/Pets'; // Example icon
import StarIcon from '@mui/icons-material/StarRate';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleIcon from '@mui/icons-material/People';


function ServiceItem({ IconComponent, title, description }) {
  return (
    <div className="service-item ">
      <div className="service-icon text-center mb-4">
        <IconComponent fontSize="large"  />
      </div>
      <h3 className="text-amber-400 text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-snug mt-2 mb-2">{description}</p>
    </div>
  );
}

function Services(props) {
    const services = [
        { IconComponent: DogIcon, title: "Dog Walking Services", description: "Connect with trustworthy dog walkers in your community. Schedule walks, track your dog’s activity, and ensure your pet is in safe hands." },
        { IconComponent: StarIcon, title: "Dog Sitting Exchange", description: "Find reliable sitters for your dog while you're away, or become a sitter yourself to earn credits and spend time with amazing pets." },
        { IconComponent: PeopleIcon, title: "Community Connections", description: "Join a passionate community of dog lovers. Share stories, get advice, and form lasting friendships with other pet owners." },
        { IconComponent: CreditCardIcon, title: "Credit System", description: "Participate in our unique credit system. Earn credits by providing services and spend them on care for your pets or at local pet-friendly businesses." },
        { IconComponent: StarIcon, title: "Reviews and Ratings", description: "Build trust within the community with a transparent review and rating system for walkers and sitters." },
        { IconComponent: StoreIcon, title: "Support for Local Pet Businesses", description: "Discover and support local businesses. Use your credits for discounts on goods and services that make your pet's life better." }
      ];
    return (    
      <div className="self-stretch text-amber-400 text-3xl font-medium leading-[58px] mt-5 max-md:max-w-full px-8 md:px-16">
      <div>
      <div className="text-center text-amber-400 text-4xl font-medium leading-normal mt-20 mb-12">
        <span className="text-white">Our </span>
        <span>Services</span>
      </div>
      <div className="services-container text-white ">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            IconComponent={service.IconComponent}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
    
    </div>
    );



};
export default Services;
