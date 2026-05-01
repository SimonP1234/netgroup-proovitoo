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
    const res = await fetch(`http://localhost:5171/api/events/${id}/register`, {
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
    <div>
      <p>Registreerimine õnnestus!</p>
      <button onClick={() => navigate('/')}>Tagasi</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registreeru sündmusele</h2>
      <input placeholder="Eesnimi" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      <input placeholder="Perenimi" value={lastName} onChange={e => setLastName(e.target.value)} required />
      <input placeholder="Isikukood" value={personalCode} onChange={e => setPersonalCode(e.target.value)} required />
      <button type="submit">Registreeru</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}