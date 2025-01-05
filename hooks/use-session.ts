import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Remember to install jwt-decode
import { User } from '@/types/user';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSession = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
    }, [router]);
    
    const fetchProfile = async (token: string) => {
      try {
        const decoded: { id: string } = jwtDecode(token);
        const res = await fetch(`/api/updateProfile/${decoded.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(!res.ok){
          throw new Error("Failed to fetch user profile");
        }
        const { user } = await res.json();
        setUser({ ...user, token });
      } catch(error){
        console.log("Error fetching profile" + error);
        handleSignOut();
      } finally {
        setLoading(false);
      }
    } 

    const updateProfile = async (updateData: Partial<User>) => {
      try {
        if(!user?._id){
          throw new Error("User is not logged in");
        }

        const res = await fetch(`/api/updateProfile/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });
        const { updatedUser } = await res.json();
        setUser(updatedUser);
      } catch(error){
        console.log(error);
      }
    }

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
        await fetchProfile(token);
    }

    return { user, loading, handleSignOut, handleSignIn, fetchProfile, updateProfile }
}