import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/frontend/store';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const store = useStore();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Fitness Tracker
        </Link>
        <button
          className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
      </header>
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Fitness Journey!
        </h1>
        <p className="text-gray-600 mb-8">
          Track your progress, connect with friends, and stay motivated!
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
        <div className="bg-gray-200 py-12 px-6 text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Features
          </h2>
          <p className="text-gray-600 mb-8">
            Our fitness tracker offers everything you need to stay on track.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <Image
                src="/workout-icon.png"
                alt="Workout Tracking"
                width={64}
                height={64}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Workout Tracking
              </h3>
              <p className="text-gray-600">
                Log your workouts and see your progress over time.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/nutrition-icon.png"
                alt="Nutrition Tracking"
                width={64}
                height={64}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Nutrition Tracking
              </h3>
              <p className="text-gray-600">
                Track your calorie intake and macronutrients.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/community-icon.png"
                alt="Social Sharing"
                width={64}
                height={64}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Social Sharing
              </h3>
              <p className="text-gray-600">
                Connect with friends and share your journey.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 py-4 px-6 text-center text-gray-300">
        <p>© 2024 Fitness Tracker</p>
      </footer>
    </motion.div>
  );
}