import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, dateTime, maxParticipants: parseInt(maxParticipants) }),
    });
    if (res.ok) {
      navigate('/');
    } else {
      setError('Sündmuse loomine ebaõnnestus');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card bg-base-100 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Lisa uus sündmus</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input placeholder="Sündmuse nimi" className="input input-bordered w-full" value={name} onChange={e => setName(e.target.value)} required />
          <input type="datetime-local" className="input input-bordered w-full" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
          <input type="number" placeholder="Max osalejad" className="input input-bordered w-full" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-full">Loo sündmus</button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}