'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { signUp, signIn } from '@/lib/auth-client';
import Logo from '@/components/Logo';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      setError(error.message || 'Something went wrong. Please try again.');
      return;
    }

    window.location.href = '/';
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-gray-200 grid grid-cols-1 lg:grid-cols-2 bg-white">
        {/* Left visual panel - desktop only */}
        <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-teal-700 to-teal-900 text-white p-10 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -right-8 bottom-12 w-36 h-36 rounded-full bg-orange-500/10" />

          <div className="relative z-10">
            <Logo variant="light" />
          </div>

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 rounded-full px-3 py-1">
              <Sparkles size={13} />
              Join thousands of travelers
            </span>
            <h2 className="font-heading text-2xl font-bold leading-snug">
              Discover your next journey with Roamly.
            </h2>
            <p className="text-teal-100 text-sm max-w-sm">
              Get AI-powered trip recommendations, save your favorite
              destinations, and plan smarter - all in one place.
            </p>
          </div>

          <p className="relative z-10 text-xs text-teal-200">
            © {new Date().getFullYear()} Roamly
          </p>
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                Create your account
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-teal-700 font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading ? 'Redirecting...' : 'Continue with Google'}
            </button>

            <div className="flex items-center gap-3 text-xs text-gray-400 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              OR
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-3">
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-teal-700"
                />
              </div>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-teal-700"
                />
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-teal-700"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-lg py-2.5 text-sm font-medium mt-4 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-teal-700 hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-teal-700 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
