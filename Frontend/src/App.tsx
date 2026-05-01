import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import EventList from './pages/EventList';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/"><h1>Event Registration</h1></Link>
      {token ? (
        <div>
          <button onClick={() => navigate('/events/new')}>Lisa sündmus</button>
          <button onClick={logout}>Logi välja</button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Logi sisse</button>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events/new" element={<CreateEvent />} />
          <Route path="/events/:id/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
