import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HOST_SERVER } from "@/config";
import Swal from "sweetalert2";

export const Register = () => {
    // Estados 
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        codigoAcuaponico: "",
    });

    // Manejo de cambios en inputs
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // Manejo del submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`${HOST_SERVER}/api/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            Swal.fire({
                title: "Usuario registrado",
                icon: "success",
                draggable: true
            });
            setFormData({
            username: "",
            email: "",
            password: "",
            codigoAcuaponico: "",
            });
        } else {
            const data = await res.json();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error: " + data.message
            });
        }
        } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al conectar con el servidor"
        });
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#c4fde5] to-[#F2ECE9] px-4">
            <div className="absolute top-4 left-4">
                <img
                    src="/src/assets/Sora-Logo.png"
                    alt="Your Company"
                    className="h-10 sm:h-16 md:h-18 w-auto max-w-[150px]"
                />
            </div>
            <div className="flex flex-col justify-center w-full max-w-md rounded-xl px-4 sm:px-8 py-6 sm:py-10 bg-[#287b60] text-white text-sm shadow-lg">
                <h2 className="text-2xl font-semibold">Registrate</h2>
                <p className="text-[#c4fde5] mt-1">Registrate para tu nueva cuenta</p>
                <form className="mt-8" onSubmit={handleSubmit}>
                <label htmlFor="username" className="block mb-1 font-medium text-white">
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 bg-white text-black border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />
                <label htmlFor="email" className="block mb-1 font-medium text-white">
                    Correo
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 bg-white text-black  border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />

                <label htmlFor="password" className="block mb-1 font-medium text-white">
                    Contraseña      
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 bg-white text-black  border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />
                <label htmlFor="codigoAcuaponico" className="block mb-1 font-medium text-white">
                    Codigo
                </label>
                <input
                    type="text"
                    id="codigoAcuaponico"
                    name="codigoAcuaponico"
                    placeholder="Codigo"
                    value={formData.codigoAcuaponico}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 bg-white text-black  border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />

                <div className="text-right mt-2">
                    <p>¿Ya tienes Cuenta?</p>
                    <h4><NavLink to='/' className="font-medium text-[#c4fde5] hover:text-[#66D962]">
                        Iniciar Sesión
                    </NavLink></h4>
                    
                </div>

                <button
                    type="submit"
                    className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-[#062319] rounded-md hover:bg-[#113f30] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Registrar
                </button>
                </form>
            </div>
        </div>
    );
}