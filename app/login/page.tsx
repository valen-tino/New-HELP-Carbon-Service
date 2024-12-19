'use client'

import Link from "next/link";
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

export default function LoginPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
    });
    const router = useRouter();
    const { handleSignIn } = useSession();

    const onSubmit = async (data: { username: string; password: string }) => {
        setIsLoading(false);
        setError("");
        setSuccess("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.error || "Something went wrong.");
            }
            setSuccess("Successfully logged in to the system.");
            handleSignIn(result.token);
            form.reset();
            router.push('/dashboard');
        } catch(error: any){
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Login with your account
            </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field}/>
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Logging in..' : 'Login'}
                        </Button>

                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm text-gray-600">Don&apos;t have an account? {''}
                    <Link href="/register" className="font-medium text-green-400 hover:text-green-800">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}