import './App.css';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './screens';
import Plantilla from './screens/plantilla';
import Login from './screens/login';
import ClienteNuevo from './screens/clientes/ClienteNuevo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import SignUp from './screens/signup';
import User from './screens/Sistema/User';
import { AuthContext } from './auth/AuthProvider';
import ChangePassword from './screens/Sistema/ChangePassword';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path='/' element={<Plantilla />}>
          <Route index element={<Index />} />
          <Route path='clientes/nuevo' element={<ClienteNuevo />} />
          <Route path={`account/${user.usuario}`} element={<User />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path={`/change-password/${user.usuario}`} element={<ChangePassword />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
