import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      setError('Vale email või parool');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card bg-base-100 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Admin sisselogimine</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Parool" className="input input-bordered w-full" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-full">Logi sisse</button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}