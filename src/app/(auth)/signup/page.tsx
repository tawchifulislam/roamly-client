'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp, signIn } from '@/lib/auth-client';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/';
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Create your Roamly account</h1>

        <button
          onClick={handleGoogleSignup}
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
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded p-2"
        />
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
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-black text-white rounded p-2"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-700 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
