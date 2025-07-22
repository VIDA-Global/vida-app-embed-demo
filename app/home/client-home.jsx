'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ClientHome({ user }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const router = useRouter();

  const invite = async () => {
    if (!inviteEmail) return;
    await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail })
    });
    setInviteEmail('');
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="text-xl font-bold">Alma AI</div>
        <div className="flex items-center gap-2">
          <span>{user.fullName}</span>
          <Image src="/avatar-placeholder.png" alt="avatar" width={32} height={32} />
          <button onClick={logout} className="ml-4 underline">Log Out</button>
        </div>
      </header>
      <div className="p-4 flex items-center gap-2 border-b">
        <input className="border p-2 flex-grow" placeholder="Invite user email" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} />
        <button onClick={invite} className="bg-blue-500 text-white p-2">Invite</button>
      </div>
      <iframe className="flex-grow" src="https://vida.io/app/embed" />
    </div>
  );
}