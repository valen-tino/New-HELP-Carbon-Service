'use client'

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert';

export default function RegisterPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: ''
        },
    });
    
    async function onSubmit(values: any){
        setIsLoading(true);
        setError('');
        setSuccess('');
    
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
    
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.error || 'Something went wrong.');
            }
            setSuccess('Successfully registred the account.');
            form.reset();
            router.push('/login');
        } catch(error: any){
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Register
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Sign up to create your account
            </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your name here" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your email here" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>New Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your username here" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password" 
                                            placeholder="Insert your password here" 
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Sign Up'}
                        </Button>
                        
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert>
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                    </form>
                </Form>

                <p className="mt-4 text-center text-sm text-gray-600">Already have an account? {''}
                    <Link href="/login" className="font-medium text-green-400 hover:text-green-800">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}