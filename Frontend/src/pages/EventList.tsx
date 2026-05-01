import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  dateTime: string;
  maxParticipants: number;
  registeredCount: number;
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
    <div className="max-w-2xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4">Sündmused</h2>
      {events.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">Sündmusi pole veel lisatud.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map(event => {
            const isFull = event.registeredCount >= event.maxParticipants;
            return (
              <div key={event.id} className="card bg-base-100 shadow-md p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <p className="text-gray-500 mt-1">{new Date(event.dateTime).toLocaleString()}</p>
                    <p className="text-sm mt-1">
                      Osalejad: {event.registeredCount} / {event.maxParticipants}
                      {isFull && <span className="text-error ml-2 font-bold">Täis!</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/events/${event.id}/register`)}
                    className={`btn ${isFull ? 'btn-disabled' : 'btn-primary'}`}
                    disabled={isFull}
                  >
                    Registreeru
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}