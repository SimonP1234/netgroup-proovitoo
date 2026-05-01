import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  dateTime: string;
  maxParticipants: number;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      {events.length === 0 ? (
        <p>Sündmusi pole veel lisatud.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <span>{event.name} — {new Date(event.dateTime).toLocaleString()} — Max: {event.maxParticipants}</span>
              <button onClick={() => navigate(`/events/${event.id}/register`)}>Registreeru</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}