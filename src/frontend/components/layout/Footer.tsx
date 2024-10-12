import React from 'react';
import Link from 'next/link';
import { useStore } from '@/frontend/store'; // Import Zustand store for global state management

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import any necessary custom components or shared utilities
// ... 

const Footer = () => {
  // Access the Zustand store for relevant data (if needed)
  const store = useStore();

  return (
    <footer className="bg-gray-800 py-4 px-6 text-center text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          {/* Display copyright information */}
          <p>© 2024 Fitness Tracker</p>
          
          {/* Optionally display links to terms of service or privacy policy */}
          <Link href="/terms" className="hover:text-blue-500">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-blue-500">
            Privacy Policy
          </Link>
        </div>
        {/* Optionally display links to social media or contact information */}
        <div className="flex space-x-4">
          <Link href="https://facebook.com/fitness-tracker" className="hover:text-blue-500">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link href="https://twitter.com/fitness_tracker" className="hover:text-blue-500">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link href="https://instagram.com/fitness.tracker" className="hover:text-blue-500">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;