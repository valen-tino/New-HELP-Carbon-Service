import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from '@/types/user';
import { useRouter } from "next/navigation";

export const useSession = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
          const decoded: User = jwtDecode(token);
          setUser(decoded);
        } else {
          router.push('/login');
          setUser(null);
        }
    }, [router]);
    
    const handleSignOut = async () => {
        localStorage.removeItem("token");
        await fetch("api/auth/logout", {
          method: "POST"
        });
        setUser(null);
        router.push("/login");
    }

    const handleSignIn = async (token: string) => {
        localStorage.setItem("token", token);
        const decoded: User = jwtDecode(token);
        setUser(decoded);
    }

    return { user, handleSignOut, handleSignIn }
}