import React from "react";
import { NavLink } from "react-router-dom";

export const Register = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#314c53] to-[#010300]">
            <div className="absolute top-4 left-4">
                <img
                    src="/src/assets/Sora-Logo.png"
                    alt="Your Company"
                    className="h-14 w-auto"
                />
            </div>
            <div className="flex flex-col justify-center w-full max-w-md rounded-xl px-8 py-10 border border-slate-700 bg-[#3F5954] text-white text-sm">
                <h2 className="text-2xl font-semibold">Sign Up</h2>
                <p className="text-slate-300 mt-1">Sign up for your new account</p>
                <form className="mt-8">
                <label htmlFor="userName" className="block mb-1 font-medium text-slate-300">
                    User Name
                </label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="User Name"
                    className="w-full p-2 mb-2 bg-[#010300] border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />
                <label htmlFor="email" className="block mb-1 font-medium text-slate-300">
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-2 bg-[#010300] border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />

                <label htmlFor="password" className="block mb-1 font-medium text-slate-300">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-2 bg-[#010300] border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />
                <label htmlFor="Code" className="block mb-1 font-medium text-slate-300">
                    Code
                </label>
                <input
                    type="text"
                    id="Code"
                    name="Code"
                    placeholder="Code"
                    className="w-full p-2 mb-2 bg-[#010300] border border-[#bbdec6] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#bbdec6] focus:border-[#bbdec6]"
                />

                <div className="text-right mt-2">
                    <p>Already have an account?</p>
                    <h4><NavLink to='/' className="font-medium text-[#bbdec6] hover:text-[#bbdec6]">
                        Sign In
                    </NavLink></h4>
                    
                </div>

                <button
                    type="submit"
                    className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-[#010300] rounded-md hover:bg-[#1E424A] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
                </form>
            </div>
        </div>
    );
}