import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
//import Image from 'next/image';
//import IKContextMe from "./IKContextMe";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const nav_logo_height = 30;
  const nav_logo_width = 4.1*nav_logo_height;
  return (
        <>       
        
        <div className="lg:px-96 px-6 flex flex-wrap items-center lg:py-0 py-2 z-10 border-brand-700 backdrop-brightness-50 relative">
                <div className="flex-1 flex justify-between items-center">
                    <a href="/">
                      PropCroc
                    </a>
                </div>
            <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block"><svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
            <input className="hidden " type="checkbox" id="menu-toggle" />

            <div className="hidden mx-auto lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="lg:flex items-center justify-between text-base font-semibold pt-4 lg:pt-0">
                        <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-brand-400 text-brand-800 hover:border-brand-400" href="/about">News</a></li>
                        <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-brand-400 text-brand-800 hover:border-brand-400" href="#">About</a></li>
                        <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-brand-400 text-brand-800 hover:border-brand-400" href="#">
                            <button className="bg-brand-200 rounded-lg text-white flex flex-1 pt-1 pb-1 px-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </a></li>
                        
                    </ul>
                </nav>
                
            </div>      

            <style jsx>
                {`
                    #menu-toggle:checked + #menu {
                    display: block;
                    }
                `}
            </style>
            
        
      </div>
    </>
  );
}