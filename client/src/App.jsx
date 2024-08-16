import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// importing user pages and components for user interface 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Bookings from './pages/Bookings';
import EachServices from './pages/EachServices';
import ErrorPage from './pages/ErrorPage';

// importing admin pages and components 
import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminEditBooking from './pages/admin/AdminEditBooking';
import AdminAddServices from './pages/admin/AdminAddServices';
import AdminBookings from './pages/admin/AdminBookings';


// importing loader for getting data 
import {loader as userLoader} from './pages/Services';
import {loader as serviceLoader} from './pages/admin/AdminServices';
import {loader as AdminLoader} from './pages/admin/Dashboard';
import {loader as sendServiceLoader} from './pages/EachServices';
import {loader as bookingLoader} from './pages/Bookings'
import {loader as adminbookings} from './pages/admin/AdminBookings'
import {loader as admineditbookings} from './pages/admin/AdminEditBooking'
import AdminEditServices, {loader as serviceEditLoader} from './pages/admin/AdminEditServices';


const router = createBrowserRouter([
  // User Routes 
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/services',
    element:<Services/>,
    loader:userLoader
  },
  {
    path:'/services/:id',
    element:<EachServices/>,
    loader: sendServiceLoader
  },
  {
    path:'/bookings',
    element:<Bookings/>,
    loader:bookingLoader
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/about',
    element:<About/>
  },

  // Admins Routes 
  {
    path:'/admin',
    element:<Dashboard/>,
    loader: AdminLoader
  },
  {
    path:'/admin/services',
    element:<AdminServices/>,
    loader:serviceLoader
  },
  {
    path:'/admin/services/:id',
    element:<AdminEditServices/>,
    loader:serviceEditLoader
  },
  {
    path:'/admin/services/create',
    element:<AdminAddServices/>
  },
  {
    path:'/admin/bookings',
    element:<AdminBookings/>,
    loader: adminbookings
  },
  {
    path:'/admin/bookings/:id/edit',
    element:<AdminEditBooking/>,
    loader: admineditbookings
  },
  {
    path: '*',
    element: <ErrorPage/>,
  },

]);


// Exporting the App component for usage in index.js
const App = () => {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
};

export default App;