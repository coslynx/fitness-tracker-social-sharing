import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/frontend/store';
import { useRouter } from 'next/navigation';
import { useUser } from '@/frontend/hooks/useAuth';

// Imports for core Next.js functionalities
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import Zustand for state management
import { useStore } from '@/frontend/store';

// Import custom hook for handling authentication
import { useUser } from '@/frontend/hooks/useAuth';


const Sidebar = () => {
  const { user } = useUser(); // Access user information from the `useUser` hook
  const router = useRouter(); // Use router for navigation within the app

  // Define state for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle sidebar opening and closing
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement logout logic using `useAuth` hook
    // ... 
    router.push('/login'); // Redirect to login page after logout
  };

  // Define sidebar animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -200, transition: { duration: 0.2 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed top-0 left-0 z-40 flex flex-col w-64 h-screen bg-gray-800 text-white shadow-md">
      {/* Sidebar content */}
      <div className="flex items-center justify-center py-4 px-6">
        <Link href="/" className="text-xl font-bold">
          Fitness Tracker
        </Link>
      </div>
      <div className="flex flex-col items-center justify-between flex-grow">
        <ul className="flex flex-col">
          {/* Sidebar navigation links */}
          <li className="py-2 px-6 hover:bg-gray-700">
            <Link href="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-700">
            <Link href="/goals" className="hover:text-blue-500">
              Goals
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-700">
            <Link href="/progress" className="hover:text-blue-500">
              Progress
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-700">
            <Link href="/community" className="hover:text-blue-500">
              Community
            </Link>
          </li>
        </ul>
        {/* User profile section (optional) */}
        {user && (
          <div className="flex flex-col items-center justify-center py-4 px-6">
            <img
              src={user.image}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full"
            />
            <h2 className="mt-2 text-lg font-bold">{user.name}</h2>
            <button onClick={handleLogout} className="mt-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;