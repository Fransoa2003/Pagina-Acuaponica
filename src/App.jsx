import { useState } from 'react';
import { Login } from './components/login';
import { Register } from './components/register';
import {Dashboard } from './components/dashboard';
import { ChartAreaInteractive } from './components/chartAreaInteractive';
import { Team } from './components/team';
// import {MensajePrueba} from './components/MensajePrueba';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';


function App() {

  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<ChartAreaInteractive />} />
        <Route path="/team" element={<Team />}/>
        {/* <Route path="/mensajeprueba" element={<MensajePrueba/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
