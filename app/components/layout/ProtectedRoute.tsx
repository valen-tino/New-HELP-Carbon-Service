'use client'

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user){
            router.push('/login');
        }
    }, [loading, user, router]);

    if(loading){
        return (
            <div>Loading..</div>
        );
    }

  return (
    <div>{children}</div>
  )
}
