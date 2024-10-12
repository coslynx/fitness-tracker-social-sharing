import React from 'react';
import { useUser } from '@/frontend/hooks/useAuth'; // Import the useAuth hook for managing authentication state
import { useRouter } from 'next/navigation'; // Import the useRouter hook for navigation within the application
import { motion } from 'framer-motion'; // Import the motion library for animations
import { UserProfileProps } from '@/frontend/types/userProfile'; // Import the UserProfileProps type for defining component props
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS for styling

const UserProfile: React.FC<UserProfileProps> = () => {
  const { user } = useUser(); // Get the user object from the useAuth hook
  const router = useRouter(); // Get the router instance for navigation

  const handleLogout = async () => {
    // Call the logout function from the useAuth hook to handle user logout
    // ...
    router.push('/login'); // Redirect the user to the login page after logout
  };

  const profileVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Render the user profile component
  return (
    <motion.div
      variants={profileVariants}
      animate={user ? 'visible' : 'hidden'}
      className="flex flex-col items-center justify-center py-4 px-6"
    >
      {/* Display the user's profile picture */}
      {user && (
        <img
          src={user.image}
          alt="Profile Picture"
          className="w-16 h-16 rounded-full"
        />
      )}

      {/* Display the user's name */}
      {user && <h2 className="mt-2 text-lg font-bold">{user.name}</h2>}

      {/* Display the user's username */}
      {user && <p className="mt-1 text-gray-600">{user.username}</p>}

      {/* Display the Logout button */}
      {user && (
        <button onClick={handleLogout} className="mt-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
          Logout
        </button>
      )}
    </motion.div>
  );
};

export default UserProfile;