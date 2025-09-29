import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/AuthPage/RegisterPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
      <Toaster position="bottom-center" />
      {/* <ChatBot/> */}
    </Router>
  );
}
