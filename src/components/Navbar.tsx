'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import Logo from '@/components/Logo';
import Container from '@/components/Container';

const loggedOutLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
];

const loggedInLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Rate Trips', href: '/trips/rate' },
  { label: 'Add Trip', href: '/trips/add' },
  { label: 'Manage Trips', href: '/trips/manage' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = session ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleNavigate =
    (href: string, closeMobile?: boolean) => (e: React.MouseEvent) => {
      if (href === '/trips/rate') {
        e.preventDefault();
        router.push(href);
        router.refresh();
      }
      if (closeMobile) setMobileOpen(false);
    };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <Container className="flex items-center justify-between h-16">
        <Logo />

        {/* Desktop nav (lg and up) */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavigate(link.href)}
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isPending ? (
            <div className="w-20 h-8" />
          ) : session ? (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <span className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-semibold">
                {session.user.name?.[0]?.toUpperCase() ?? 'U'}
              </span>
              <span className="text-sm text-gray-600 max-w-25 truncate">
                {session.user.name}
              </span>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-teal-700 hover:bg-teal-800 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile / tablet toggle (below lg) */}
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile / tablet dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <Container className="py-4 flex flex-col gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate(link.href, true)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-3">
              {isPending ? null : session ? (
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-semibold">
                      {session.user.name?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm text-red-600 font-medium"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 text-sm font-medium rounded-lg bg-teal-700 text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
