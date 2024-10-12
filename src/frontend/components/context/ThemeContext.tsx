import React, { createContext, useState, useContext, useEffect } from "react";
import { Theme } from "@/frontend/types/theme";
import { useStore } from "@/frontend/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Define the initial theme state
const initialTheme: Theme = {
  mode: "light",
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#fff",
  text: "#333",
};

// Create the theme context
const ThemeContext = createContext<Theme>(initialTheme);

// Define the ThemeProvider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const { user } = useStore(); // Access user data from the Zustand store
  const supabase = useSupabaseClient(); // Get the Supabase client instance

  // Load the user's preferred theme from Supabase on component mount
  useEffect(() => {
    const loadTheme = async () => {
      if (user) {
        const { data } = await supabase
          .from("user_settings")
          .select("theme")
          .eq("user_id", user?.id);
        if (data) {
          setTheme(data[0].theme);
        }
      }
    };
    loadTheme();
  }, [user, supabase]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for accessing the theme context
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };