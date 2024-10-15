import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Customer from './pages/Customer';
import CustomerProfile from './pages/CustomerProfile';
import CustomerSetting from './pages/CustomerSetting';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<SignUp/>} />
                <Route path="/customer" element={<Customer/>} />
                <Route path="/customer/profile" element={<CustomerProfile/>} />
                <Route path="/customer/setting" element={<CustomerSetting/>} />
            </Routes>
        </Router>
    );
};

export default App;
