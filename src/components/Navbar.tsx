'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Roamly
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/explore">Explore</Link>
          <Link href="/about">About</Link>

          {isPending ? null : session ? (
            <>
              <Link href="/trips/add">Add Trip</Link>
              <Link href="/trips/manage">Manage Trips</Link>
              <span className="text-sm text-gray-500">{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-black px-3 py-1 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
