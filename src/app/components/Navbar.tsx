// components/Navbar.tsx

'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearAuth, setAuthLoading } from '@/app/lib/redux/features/auth/authSlice';
import { RootState } from '@/app/lib/redux/store';

export default function Navbar() {
    const { data: session, status } = useSession();

    // Get Redux dispatch function
    const dispatch = useDispatch();

    // Get auth state from Redux store
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    // Use useEffect to sync Next-Auth session with Redux store
    useEffect(() => {
        if (status === 'loading') {
            dispatch(setAuthLoading());
        }
        if (status === 'authenticated') {
            dispatch(setUser(session.user || null));
        }
        if (status === 'unauthenticated') {
            dispatch(clearAuth());
        }
    }, [status, session, dispatch]);

    const handleSignOut = () => {
        dispatch(clearAuth()); // Immediately update UI
        signOut({ callbackUrl: '/login' }); // Sign out from Next-Auth
      };

    if (status === 'loading') {
        return <nav style={{ padding: '1rem' }}>Loading...</nav>;
    }

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link href="/">Home</Link>
          <div>
            {isAuthenticated ? (
              <>
                <span style={{ marginRight: '1rem' }}>Signed in as {user?.email}</span>
                <button onClick={handleSignOut}>Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ marginRight: '1rem' }}>Sign In</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      );
}