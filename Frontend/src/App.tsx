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
    <nav className="navbar bg-base-100 shadow px-6 py-4">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold"><h1>Event Registration</h1></Link>
      </div>
      <div className="flex gap-2">
        {token ? (
          <>
            <button onClick={() => navigate('/events/new')} className="btn btn-primary">Lisa sündmus</button>
            <button onClick={logout} className="btn btn-ghost">Logi välja</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="btn btn-primary">Logi sisse</button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="max-w-2xl mx-auto p-4 mt-6">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events/new" element={
            localStorage.getItem('token') ? <CreateEvent /> : <Login />
          } />
          <Route path="/events/:id/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}


export default App
