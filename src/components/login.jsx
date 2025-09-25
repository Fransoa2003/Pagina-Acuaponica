import React from "react";
import { NavLink } from "react-router-dom";


export const Login = () => {
    return (
        
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#acce91] to-[#efeae4]">
            <div className="absolute top-4 left-4">
                <img
                    src="/src/assets/Sora-Logo.png"
                    alt="Your Company"
                    className="h-18 w-auto"
                />
            </div>
            <div className="flex flex-col justify-center w-full max-w-md rounded-xl px-8 py-10  bg-[#7DA77D] text-white text-sm">
                <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
                <p className="text-[#465344] mt-1">Inicia sesión desde tu cuenta</p>
                <form className="mt-8">
                <label htmlFor="email" className="block mb-1 font-medium text-white">
                    Correo
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    className="w-full p-2 mb-2 bg-white border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6] text-black"
                />

                <label htmlFor="password" className="block mb-1 font-medium text-white">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full p-2 mb-2 bg-white border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6] text-black"
                />

                <div className="text-right mt-2">
                    <p>¿Nuevo en Sora?</p>
                    <h4><NavLink to='/register' className="font-medium text-[#465344] hover:text-[#bbdec6]">
                        Únete ahora
                    </NavLink></h4>
                    
                </div>

                <button
                    type="submit"
                    className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-[#373737] rounded-md hover:bg-[#4C6948] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Acceder
                </button>
                </form>
            </div>
        </div>
    );
}