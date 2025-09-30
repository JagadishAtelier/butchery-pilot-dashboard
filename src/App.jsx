import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/AuthPage/RegisterPage';
import Login from './Components/AuthPage/Login';
import Home from './Components/HomePage/Home';
import ViewOrderDetails from './Components/HomePage/ViewOrderDetails';
import TakeOrder from './Components/HomePage/TakeOrder';
import LgScreen from './Components/LgScreen/LgScreen';
import StoreLocation from './Components/HomePage/StoreLocation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route
  path='/'
  element={
    <>
      {/* Mobile view */}
      <div className="block md:hidden lg:hidden">
        <LoginPage />
      </div>

      {/* Large screen view */}
      <div className="hidden md:block lg:block">
        <LgScreen />
      </div>
    </>
  }
/>

        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/order-details' element={<ViewOrderDetails/>}/>
        <Route path='/accpted-order' element={<TakeOrder/>}/>
        <Route path='/go-to-store' element={<StoreLocation/>}/>
      </Routes>
      <Toaster position="bottom-center" />
      {/* <ChatBot/> */}
    </Router>
  );
}
