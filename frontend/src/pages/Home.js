import * as React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"
function Home(props) {
  return (
    <div className="bg-neutral-100 flex flex-col">
<Navbar/>
      <div className="self-center w-full max-w-[1248px] mt-44 px-px max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[46%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col pb-12 px-5 items-start max-md:max-w-full max-md:mt-10">
              <div className="items-stretch bg-neutral-800 flex w-[213px] max-w-full gap-1.5 pl-3.5 pr-5 py-2.5 rounded-[61px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c9f5045-aba5-4a1b-8991-bd2b96e071b8?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-lg font-light leading-6 grow whitespace-nowrap">
                  Background check
                </div>
              </div>
              <div className="self-stretch text-amber-400 text-5xl font-medium leading-[58px] mt-5 max-md:max-w-full">
                <span className="text-black">
                  Welcome to PawPal Community
                  <br />
                </span>
                <span className="text-amber-400">Connecting</span>
                <span className="text-black"> Dog Lovers for a </span>
                <span className="text-amber-400">Happier, Healthier</span>
                <span className="text-black"> </span>
                <span className="text-amber-400">Pet </span>
                <span className="text-black">Experience</span>
              </div>
              <div className="self-stretch text-neutral-400 text-lg font-light leading-7 mt-3.5 max-md:max-w-full">
                Join PawPal Community to connect with trusted dog walkers or
                share your passion for pets by providing care. Our
                community-driven platform makes pet care easy, affordable, and
                reliable.
              </div>
              <Link to="/signup">
              <button className="text-zinc-900 text-lg leading-7 whitespace-nowrap bg-amber-400 w-[138px] max-w-full justify-center mt-12 mb-48 pl-8 pr-5 py-5 rounded-[82px] items-start max-md:my-10 max-md:pl-2.5">
                Join Now
              </button>
              </Link>
            
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[54%] ml-5 max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d34f2643-f23b-4c15-be27-60ff8cc0a131?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
              className="aspect-[0.78] object-contain object-center w-full overflow-hidden max-md:max-w-full max-md:mt-10"
            />
          </div>
        </div>
      </div>
      <div className="self-center text-amber-400 text-5xl font-medium leading-[72px] w-[1391px] max-w-[1391px] mt-20 max-md:max-w-full max-md:text-4xl max-md:leading-[67px] max-md:mt-10">
        <span className="text-black">Our </span>
        <span className="text-amber-400">Services</span>
      </div>
      <div className="items-stretch self-center flex w-full max-w-[1391px] justify-between gap-5 mt-24 px-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
        <div className="items-center flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Dog Walking Services
          </div>
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Connect with trustworthy dog walkers in your community. Schedule
            walks, track your dog’s activity, and ensure your pet is in safe
            hands.
          </div>
        </div>
        <div className="bg-neutral-800 w-px shrink-0 h-[265px]" />
        <div className="items-center flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Dog Sitting Exchange
          </div>
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Find reliable sitters for your dog while you're away, or become a
            sitter yourself to earn credits and spend time with amazing pets.
          </div>
        </div>{" "}
        <div className="bg-neutral-800 w-px shrink-0 h-[265px]" />{" "}
        <div className="items-center flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>{" "}
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Community Connections
          </div>{" "}
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Join a passionate community of dog lovers. Share stories, get
            advice, and form lasting friendships with other pet owners.
          </div>
        </div>
      </div>{" "}
      <div className="self-center flex w-full max-w-[1391px] justify-between gap-5 mt-24 px-5 items-start max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
        <div className="items-center self-stretch flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>{" "}
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Credit System
          </div>{" "}
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Participate in our unique credit system. Earn credits by providing
            services and spend them on care for your pets or at local
            pet-friendly businesses.
          </div>
        </div>{" "}
        <div className="bg-neutral-800 self-stretch w-px shrink-0 h-[292px]" />{" "}
        <div className="items-center flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>{" "}
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Reviews and Ratings
          </div>{" "}
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Build trust within the community with a transparent review and
            rating system for walkers and sitters.
          </div>
        </div>{" "}
        <div className="bg-neutral-800 self-stretch w-px shrink-0 h-[292px]" />{" "}
        <div className="items-center flex grow basis-[0%] flex-col">
          <div className="items-stretch bg-black bg-opacity-10 flex w-[98px] flex-col justify-center h-[98px] px-2.5 rounded-[70px]">
            <div className="items-start border flex w-full shrink-0 h-[74px] flex-col rounded-[50px] border-solid border-lime-400 max-md:mr-1" />
          </div>{" "}
          <div className="self-stretch text-black text-center text-2xl leading-9 mt-8">
            Support for Local Pet Businesses
          </div>{" "}
          <div className="self-stretch text-neutral-400 text-center text-lg font-light leading-7 mt-5">
            Discover and support local businesses. Use your credits for
            discounts on goods and services that make your pet's life better.
          </div>
        </div>
      </div>
      <div className="items-center bg-zinc-900 self-stretch flex w-full flex-col justify-center mt-52 px-5 py-11 max-md:max-w-full max-md:mt-10">
        <div className="flex w-full max-w-[1188px] flex-col items-stretch mt-20 max-md:max-w-full max-md:mt-10">
          <div className="text-white text-3xl font-bold leading-8 self-center whitespace-nowrap">
            PawPal Community
          </div>
          <div className="self-center flex w-[804px] max-w-full items-stretch gap-5 mt-16 max-md:flex-wrap max-md:justify-center max-md:mt-10">
            <div className="items-center flex justify-between gap-1.5 rounded-md">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/410b2e8a-601d-4275-9f44-b213ae0146c2?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-200 text-lg leading-7 self-stretch grow whitespace-nowrap">
                no-reply@pawpal.com
              </div>
            </div>
            <div className="items-center flex justify-between gap-1.5 rounded-md">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd12e096-e428-4904-b9a9-41b364dae37d?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-200 text-lg leading-7 self-stretch grow whitespace-nowrap">
                +1 123 45 6789
              </div>
            </div>
            <div className="items-center flex justify-between gap-1.5 rounded-md">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/976d87e4-baae-4e99-be88-baca2ed73890?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-200 text-lg leading-7 self-stretch grow whitespace-nowrap">
                University of Illinois Urbana-Champaign
              </div>
            </div>
          </div>
          <div className="justify-between items-stretch border border-[color:var(--grey-15,#262626)] bg-zinc-900 flex w-full gap-5 mt-12 pl-4 pr-8 py-4 rounded-[100px] border-solid max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10 max-md:pr-5">
            <div className="items-stretch flex gap-3.5 max-md:justify-center">
              <div className="items-center bg-amber-400 flex aspect-square flex-col justify-center w-[52px] h-[52px] px-3.5 rounded-[100px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf42c288-a983-442a-82a3-cf232f499448?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                  className="aspect-square object-contain object-center w-full overflow-hidden"
                />
              </div>
              <div className="items-center bg-amber-400 flex aspect-square flex-col justify-center w-[52px] h-[52px] px-3.5 rounded-[100px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/845b4d12-c3d7-4a07-82a1-34012a1ffde0?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                  className="aspect-square object-contain object-center w-full overflow-hidden"
                />
              </div>
              <div className="items-center bg-amber-400 flex aspect-square flex-col justify-center w-[52px] h-[52px] px-3.5 rounded-[100px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bb58b5d-c497-43f8-ba47-55181e918dcf?apiKey=b6efff77b1954bf8adcc61d498a05f89&"
                  className="aspect-square object-contain object-center w-full overflow-hidden"
                />
              </div>
            </div>
            <div className="text-zinc-400 text-lg font-light leading-7 self-center grow shrink basis-auto my-auto">
              PawPal Inc. All Rights Reserved
            </div>
            <div className="items-stretch self-center flex gap-3 my-auto max-md:justify-center">
              <div className="text-zinc-400 text-lg font-light leading-7 whitespace-nowrap">
                Privacy Policy
              </div>
              <div className="bg-zinc-400 w-px shrink-0 h-[27px]" />
              <div className="text-zinc-400 text-lg font-light leading-7 whitespace-nowrap">
                Terms of Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Home;
