import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Customer from './pages/Customer';
import CustomerProfile from './pages/CustomerProfile';
import CustomerSetting from './pages/CustomerSetting';
import NewRide from './pages/NewRide';
import SignIn from './pages/SignIn';
import DriverSignIn from './pages/DriverSignIn';
import DriverSignUp from './pages/DriverSignUp';
import DriverDashboard from './pages/Driver';
import OpenRides from './pages/OpenRides';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/customer/login" element={<SignIn/>} />
                <Route path="/customer/register" element={<SignUp/>} />
                <Route path='/driver/login' element={<DriverSignIn/>}/>
                <Route path='/driver/register' element={<DriverSignUp/>}/>
                <Route path="/customer" element={<Customer/>} />
                <Route path="/driver" element={<DriverDashboard/>} />
                <Route path="/driver/rides" element={<OpenRides/>} />
                <Route path="/customer/profile" element={<CustomerProfile/>} />
                <Route path="/customer/setting" element={<CustomerSetting/>} />
                <Route path="/customer/new_ride" element={<NewRide/>} />
            </Routes>
        </Router>
    );
};

export default App;
