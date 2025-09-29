import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HOST_SERVER } from "@/config";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`${HOST_SERVER}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            navigate("/dashboard");
        } else {
            const data = await res.text();
            alert("Error: " + data);
        }
        } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
        }
    };
    return (
        
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#c4fde5] to-[#F2ECE9] px-4">
            <div className="absolute top-4 left-4">
                <img
                    src="/src/assets/Sora-Logo.png"
                    alt="Your Company"
                    className="h-18 w-auto"
                />
            </div>
            <div className="flex flex-col justify-center w-full max-w-md rounded-xl px-4 sm:px-8 py-6 sm:py-10 bg-[#287b60] text-white text-sm shadow-lg">
                <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
                <p className="text-[#c4fde5] mt-1">Inicia sesión desde tu cuenta</p>
                <form className="mt-8" onSubmit={handleSubmit}>
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
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 bg-white border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6] text-black"
                />

                <div className="text-right mt-2">
                    <p>¿Nuevo en Sora?</p>
                    <h4><NavLink to='/register' className="font-medium text-[#c4fde5] hover:text-[#66D962]">
                        Únete ahora
                    </NavLink></h4>
                    
                </div>

                <button
                    type="submit"
                    className="cursor-pointer w-full mt-10 px-4 py-2.5 font-medium text-white bg-[#062319] rounded-md hover:bg-[#113f30] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Acceder
                </button>
                </form>
            </div>
        </div>
    );
}