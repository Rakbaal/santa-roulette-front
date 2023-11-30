import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import UserPage from './pages/userPage/userPage';
import { useEffect, useState } from 'react';
import { Participant } from './models/participant';
import UserContext from './components/contexts/userContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem("user") ? <UserPage /> : <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/user-page",
    element: <UserPage />
  },
])

const storedUser = localStorage.getItem("user")
const parsedUser = storedUser ? JSON.parse(storedUser) : new Participant()

function App() {
  const [user, setUser] = useState<Participant>(new Participant(parsedUser.id, parsedUser.pseudo, parsedUser.famille))

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <div className='bg-img'/>
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
