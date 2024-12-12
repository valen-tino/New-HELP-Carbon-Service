'use client'

import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";

export default function RegisterPage(){
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const initSignUp = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup', user);
            console.log(res.data);
        } catch(err: any){
            console.log('Failed to sign up. ', err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(
            user.name.length > 0 &&
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    console.log(user);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <h1 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {loading ? 'Processing' : 'Free Sign Up'}
        </h1>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <input 
                        id="name"
                        type="text"
                        value={user.name}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Your Email" 
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Your Username"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Your Password" 
                    />
                </div>
                <div>
                    <button
                        onClick={initSignUp}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {buttonDisabled ? 'Sign Up' : 'Register My Account Now'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}