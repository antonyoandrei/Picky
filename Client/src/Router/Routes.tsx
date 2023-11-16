import { Route, Routes } from 'react-router-dom';
import { FC } from 'react'; 
import Details from '../pages/Details/details';
import Homepage from '../pages/Homepage/homepage';
import SeeAll from '../pages/See all/seeall';
import PrivateRoutes from './PrivateRoutes';

const RoutesComponent: FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/*" element={
                <PrivateRoutes>
                    <Routes>
                        <Route path='/details' element={<Details />} />
                        <Route path='/see-all' element={<SeeAll />} />
                    </Routes>
                </PrivateRoutes>
            } />
        </Routes>
    );
};

export default RoutesComponent;
