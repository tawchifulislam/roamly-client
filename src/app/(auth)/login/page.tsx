'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/';
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const handleDemoLogin = () => {
    setEmail('demo@roamly.com');
    setPassword('Demo@1234');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login to Roamly</h1>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full border rounded p-2 flex items-center justify-center gap-2"
        >
          {googleLoading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          OR
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white rounded p-2"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full text-sm text-teal-700 underline underline-offset-4"
        >
          Use Demo Credentials
        </button>

        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-teal-700 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
