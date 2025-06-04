import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError('ไม่สามารถสมัครได้ กรุณาตรวจสอบข้อมูล');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 font-sans">
      <h1 className="text-xl font-bold text-center mb-6 text-green-700">📝 สมัครสมาชิก</h1>
      <input
        className="border px-3 py-2 mb-3 w-full rounded"
        type="email"
        placeholder="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-3 py-2 mb-3 w-full rounded"
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <button
        onClick={signup}
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        สมัครสมาชิก
      </button>
    </div>
  );
}
