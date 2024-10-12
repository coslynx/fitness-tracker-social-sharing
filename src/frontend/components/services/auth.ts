import { useSession, Session } from "next-auth/react";
import { useStore } from "@/frontend/store";
import { useRouter } from "next/navigation";
import { useUser } from "@/frontend/hooks/useAuth";
import { useState, useEffect } from "react";

// Import Tailwind CSS for styling
import "tailwindcss/tailwind.css";

// Define the `useAuth` hook as a function
const useAuth = (): {
  // Define the properties and functions available within the hook
  user: any | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
} => {
  const { user, setUser, setLoggedIn } = useStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Access the Authentication context for user data
  const { user: authUser } = useContext(AuthContext);

  // Update the user data from the Authentication context
  useEffect(() => {
    setUser(authUser);
  }, [authUser, setUser]);

  // Handle the login process using NextAuth.js
  const login = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
      const session = await getSession();
      setUser(session.user);
      setLoggedIn(true);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "An error occurred during login. Please try again later." });
      setIsLoading(false);
    }
  };

  // Handle the logout process using NextAuth.js
  const logout = async () => {
    setIsLoading(true);

    try {
      await signOut();
      setUser(null);
      setLoggedIn(false);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setErrors({ general: "An error occurred during logout. Please try again later." });
      setIsLoading(false);
    }
  };

  // Return the properties and functions of the hook
  return {
    user,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;