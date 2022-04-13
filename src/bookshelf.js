import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext, { User } from './context/user_context';
import Home from './pages/home';
import Auth from './pages/auth';

function Bookshelf() {
  const [user, setUser] = useState(User.None);
  const updateUser = (newUser) => setUser(newUser);

  console.log(user);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default Bookshelf;

