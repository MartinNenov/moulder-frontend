'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false, // Don't redirect automatically, handle it manually
      email,
      password,
    });

    if (result?.ok) {
      router.push('/'); // Redirect to homepage on success
    } else {
      setError(result?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="mx-auto max-w-sm flex items-center flex-col gap-y-4 rounded-sm border-purple-900 border-x">
      <h1>Sign In</h1>
      <form className="flex items-center flex-col gap-y-4" onSubmit={handleSubmit}>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}