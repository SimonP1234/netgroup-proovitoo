import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalCode, setPersonalCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/events/${id}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, personalCode }),
    });
    if (res.ok) {
      setSuccess(true);
    } else {
      const text = await res.text();
      setError(text || 'Registration failed');
    }
  };

  if (success) return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card bg-base-100 shadow-md p-8 text-center">
        <p className="text-xl font-bold text-success mb-6">Registreerimine õnnestus!</p>
        <button onClick={() => navigate('/')} className="btn btn-primary w-full">Tagasi</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card bg-base-100 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Registreeru sündmusele</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input placeholder="Eesnimi" className="input input-bordered w-full" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input placeholder="Perenimi" className="input input-bordered w-full" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input placeholder="Isikukood" className="input input-bordered w-full" value={personalCode} onChange={e => setPersonalCode(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-full">Registreeru</button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}