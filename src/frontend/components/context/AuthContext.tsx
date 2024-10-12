import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, Session } from "next-auth/react"; // Import NextAuth.js session hook for managing authentication state
import { useStore } from "@/frontend/store"; // Import Zustand store for global state management
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation within the app

// Import Tailwind CSS for styling
import "tailwindcss/tailwind.css";

// Create the authentication context
const AuthContext = createContext<{ user: any | null }>({ user: null });

// Define the AuthProvider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession(); // Use NextAuth.js session hook to access authentication data
  const router = useRouter(); // Get the router instance for navigation
  const { user, setUser, setLoggedIn } = useStore(); // Access the Zustand store for global state management

  // Update the user data in the Zustand store when the authentication status changes
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser(session.user); // Update the user data in the Zustand store
      setLoggedIn(true); // Set the logged-in flag to true
    } else {
      setUser(null); // Clear the user data
      setLoggedIn(false); // Set the logged-in flag to false
    }
  }, [session, status, setUser, setLoggedIn]);

  // Ensure that the user is redirected to the login page if not logged in
  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/signup" && !user) {
      router.push("/login"); // Redirect to the login page
    }
  }, [user, router]);

  // Render the AuthContext provider with the current user data
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for accessing the authentication context
const useAuth = () => useContext(AuthContext);

// Export the AuthProvider and useAuth hook for use in other components
export { AuthProvider, useAuth };