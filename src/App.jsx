import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/AuthPage/RegisterPage';
import Login from './Components/AuthPage/Login';
import Home from './Components/HomePage/Home';
import ViewOrderDetails from './Components/HomePage/ViewOrderDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/order-details' element={<ViewOrderDetails/>}/>
      </Routes>
      <Toaster position="bottom-center" />
      {/* <ChatBot/> */}
    </Router>
  );
}
