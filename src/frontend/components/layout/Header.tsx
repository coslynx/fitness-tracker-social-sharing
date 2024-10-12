import Link from 'next/link';
import { useSession, Session } from 'next-auth/react';
import { useStore } from '@/frontend/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/frontend/hooks/useAuth';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import the necessary components from the shared UI library (if applicable)
// ...

const Header: React.FC = () => {
  const { data: session } = useSession(); // Use NextAuth.js session hook
  const router = useRouter();
  const { user } = useUser(); // Access user data from the `useUser` hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    // Implement logout logic using the `useAuth` hook
    // ...
    router.push('/login'); // Redirect to login page after logout
  };

  const handleSidebarToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      variants={headerVariants}
      animate={session ? 'visible' : 'hidden'}
      className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
    >
      <Link href="/" className="text-xl font-bold text-gray-800">
        Fitness Tracker
      </Link>
      <div className="flex items-center">
        {/* User profile section */}\n        {user && (\n          <div className=\"flex flex-col items-center justify-center py-4 px-6\">\n            <img\n              src={user.image}\n              alt=\"Profile Picture\"\n              className=\"w-16 h-16 rounded-full\"\n            />\n            <h2 className=\"mt-2 text-lg font-bold\">{user.name}</h2>\n            <button onClick={handleLogout} className=\"mt-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600\">\n              Logout\n            </button>\n          </div>\n        )}\n      </div>
      <button
        className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
        onClick={handleSidebarToggle}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </motion.header>
  );
};

export default Header;