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
    const res = await fetch('http://localhost:5171/api/events', {
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
    <form onSubmit={handleSubmit}>
      <h2>Lisa uus sündmus</h2>
      <input placeholder="Sündmuse nimi" value={name} onChange={e => setName(e.target.value)} required />
      <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
      <input type="number" placeholder="Max osalejad" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} required />
      <button type="submit">Loo sündmus</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}