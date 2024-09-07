// hooks/useSession.js
import { useState, useEffect } from 'react';

export default function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/session');
      if (res.ok) {
        const data = await res.json();
        setSession(data.user);
      } else {
        setSession(null);
      }
    }
    fetchSession();
  }, []);

  return session;
}
