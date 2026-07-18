'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import Logo from '@/components/Logo';
import Container from '@/components/Container';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <Container className="flex items-center justify-between py-4">
        <Logo />

        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/explore"
            className="hover:text-teal-700 transition-colors"
          >
            Explore
          </Link>
          <Link href="/about" className="hover:text-teal-700 transition-colors">
            About
          </Link>

          {isPending ? null : session ? (
            <>
              <Link
                href="/recommendations"
                className="hover:text-teal-700 transition-colors"
              >
                AI Recommendations
              </Link>
              <Link
                href="/trips/add"
                className="hover:text-teal-700 transition-colors"
              >
                Add Trip
              </Link>
              <Link
                href="/trips/manage"
                className="hover:text-teal-700 transition-colors"
              >
                Manage Trips
              </Link>
              <span className="text-gray-500">{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-teal-700 hover:bg-teal-800 px-3 py-1.5 text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-teal-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-teal-700 hover:bg-teal-800 px-3 py-1.5 text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
}
