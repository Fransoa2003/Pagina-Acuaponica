import React, { useState } from "react";
import img from "../assets/Sora-Logo.png";
import planta from "../assets/planta.jpg";
import imgFransoa from "../assets/Francisco-Img.png"
import imgEmmanuel from "../assets/Emmanuel-Img.png"
import { NavLink } from "react-router-dom";


export const Team = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c4fde5] to-[#efeae4]">
            {/* NAVBAR */}
            
            <nav className="relative bg-[#373737] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 z-10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                        <img
                            src={img}
                            alt="Your Company"
                            className="h-10 w-auto"
                        />
                        </div>
        
                        {/* Links */}
                        <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <a
                            href="#"
                            aria-current="page"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                            >
                            Centro de datos
                            </a>
                            <a
                            href=""
                            className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                            >
                            Equipo
                            </a>
                            
                        </div>
                        </div>
                    </div>
        
                    {/* Perfil / Notificaciones */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Notificaciones */}
                        <button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                        <span className="sr-only">View notifications</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-6 h-6"
                        >
                            <path
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                        </button>
        
                        {/* Dropdown de usuario */}
                        <div className="relative ml-3">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={planta}
                            alt="User"
                            />
                        </button>
        
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-white/10 z-50">
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Your profile
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Settings
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Sign out
                            </a>
                            </div>
                        )}
                        </div>
        
                    </div>
                    </div>
                </div>
            </nav>
            {/* Contenido principal */}
            <div className="flex flex-nowrap bg-red">
            <div className="bg-black">
                <img src={imgFransoa} alt=""  className=" h-64 object-cover 
                [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] 
                [mask-repeat:no-repeat] [mask-size:100%_100%]"/>
             </div>
             <div className="bg-black">
                <img src={imgEmmanuel} alt=""  className=" h-64 object-cover 
                [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] 
                [mask-repeat:no-repeat] [mask-size:100%_100%] "/>
             </div>
            </div>
            
        </div>
    );
}