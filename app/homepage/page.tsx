'use client';

import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Homepage() {
  const { user, isLoggedIn, logout } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    // หากคุณมีการจัดการ session หรือ JWT ก็สามารถลบที่นี่
    logout();
    setLoading(false);
    router.push('/login'); // เปลี่ยนเส้นทางไปหน้า login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">{isLoggedIn ? `Hello, ${user}` : 'Welcome, Guest'}</h1>
      
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      ) : (
        <div className="mt-4">
          <a href="/login" className="p-2 bg-blue-500 text-white rounded">Login</a>
          <a href="/register" className="ml-4 p-2 bg-green-500 text-white rounded">Register</a>
        </div>
      )}
    </div>
  );
}
