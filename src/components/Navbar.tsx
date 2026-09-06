'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, ChevronDown, Info, Mail } from 'lucide-react';
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

const moreLinks = [
  { label: 'About Us', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const links = session ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isMoreActive = moreLinks.some(link => isActive(link.href));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <nav className="sticky top-0 z-50 w-full bg-mist-50/90 backdrop-blur-md border-b border-mist-200">
      <Container className="flex items-center justify-between h-16">
        <Logo />

        <div className="hidden lg:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavigate(link.href)}
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'text-delta-700 bg-delta-100'
                  : 'text-ink-500 hover:text-delta-700 hover:bg-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(prev => !prev)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isMoreActive || moreOpen
                  ? 'text-delta-700 bg-delta-100'
                  : 'text-ink-500 hover:text-delta-700 hover:bg-white'
              }`}
            >
              More
              <ChevronDown
                size={14}
                className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-mist-200 shadow-[0_12px_32px_rgba(10,36,38,0.12)] py-1.5 overflow-hidden">
                {moreLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                      isActive(href)
                        ? 'text-delta-700 bg-delta-100'
                        : 'text-ink-500 hover:bg-mist-50'
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-9 rounded-lg bg-mist-200 animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3 pl-3 border-l border-mist-200">
              <span className="w-8 h-8 rounded-full bg-delta-700 text-white flex items-center justify-center text-xs font-semibold">
                {session.user.name?.[0]?.toUpperCase() ?? 'U'}
              </span>
              <span className="text-sm text-ink-500 max-w-25 truncate">
                {session.user.name}
              </span>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-500 hover:bg-mist-100 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-ink-500 hover:text-delta-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-delta-700 hover:bg-delta-900 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ink-500 hover:bg-mist-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-mist-200 bg-mist-50">
          <Container className="py-4 flex flex-col gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate(link.href, true)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-delta-700 bg-delta-100'
                    : 'text-ink-500 hover:bg-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-mist-200 my-2 pt-2">
              <p className="px-3 text-[11px] font-medium uppercase tracking-wide text-ink-500/70 mb-1">
                More
              </p>
              {moreLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(href)
                      ? 'text-delta-700 bg-delta-100'
                      : 'text-ink-500 hover:bg-white'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              ))}
            </div>

            <div className="border-t border-mist-200 mt-1 pt-3">
              {isPending ? null : session ? (
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-delta-700 text-white flex items-center justify-center text-xs font-semibold">
                      {session.user.name?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                    <span className="text-sm text-ink-900">
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
                    className="text-center py-2.5 text-sm font-medium border border-mist-200 rounded-lg text-ink-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 text-sm font-medium rounded-lg bg-delta-700 text-white"
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
