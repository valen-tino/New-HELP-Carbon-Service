'use client'

import Link from "next/link"
import React, { useEffect } from 'react';
import axios from 'axios';

export default function LoginPage(){
    const [user, setUser] = React.useState({
        username: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const initLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/auth/login', user);
            console.log('Successfully logged in' + res.data);
        } catch(err: any){
            console.log('Failed to sign up. ', err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if( user.username.length > 0 &&
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
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign In to your account</h2>
        </div>
        <h1 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {loading ? 'Processing' : 'Free Login'}
        </h1>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
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
                        onClick={initLogin}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {buttonDisabled ? 'Login' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
