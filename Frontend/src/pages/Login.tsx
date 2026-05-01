import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5171/api/auth/login', {
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
    <form onSubmit={handleSubmit}>
      <h2>Admin sisselogimine</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Parool" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Logi sisse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}