import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/admdashboard' element={<AdminDashboard/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
