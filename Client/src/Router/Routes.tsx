import { Route, Routes } from 'react-router-dom';
import { FC } from 'react'; 
import Details from '../pages/Details/details';
import Homepage from '../pages/Homepage/homepage';
import LogIn from '../pages/Log in/login';
import Register from '../pages/Register/register';
import SeeAll from '../pages/See all/seeall';
import User from '../pages/User/user';
import PrivateRoutes from './PrivateRoutes';

const RoutesComponent: FC = () => {

    return (
        <Routes>
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/*" element={
                <PrivateRoutes>
                    <Routes>
                        <Route path='/details' element={<Details />} />
                        <Route path='/see-all' element={<SeeAll />} />
                        <Route path='/user' element={<User />} />
                    </Routes>
                </PrivateRoutes>
            } />
        </Routes>
    );
};

export default RoutesComponent;
