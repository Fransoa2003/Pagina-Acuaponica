import React, { useState } from "react";
import { Ph } from "./Ph";
import { Temperatura } from "./temperatura";
import { Conductividad } from "./conductividad";
import { Solidos } from "./solidos";
import img from "../assets/Sora-Logo.png";
import planta from "../assets/planta.jpg";
import { ChartAreaInteractive } from "./chartAreaInteractive";
import { useNavigate } from "react-router-dom";
import { HOST } from "@/config";

export const Dashboard = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch(`http://${HOST}:3001/api/logout`, {
        method: "POST", 
        credentials: "include",
      });

      if (res.ok) {
        navigate("/");
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };
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
                    className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                  >
                    Centro de datos
                  </a>
                  <a
                    href="http://192.168.16.120"
                    aria-current="page"
                    className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                  >
                    Camara
                  </a>
                </div>
              </div>
            </div>

            {/* Perfil*/}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Cerrar sesión
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Graficas de sensores*/}
      <div className="flex items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <Ph />
          <Temperatura />
          <Conductividad />
          <Solidos />
          
        </div>
        
      </div>
      <div className=" justify-center p-6">
      <ChartAreaInteractive />
      </div>
    </div>
  );
};
