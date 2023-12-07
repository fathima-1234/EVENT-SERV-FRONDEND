import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from './pages/Home'
import Register from "./components/accounts/Register";
import Servicerregister from './components/servicer/Servicerregister'
import LoginServicer from './components/servicer/LoginServicer'
import Profile from './components/user/Profile';
import AdminHome from './pages/admin/AdminHome'
import User from "./components/admin/User";
import Event1 from './components/user/Event1'
import Servicer from "./components/admin/Servicer";
import Events from './components/admin/Events'
import SingleView from "./components/user/SingleView";
import Dashboards from "./components/servicer/Dashboards";
import Eventservicer from './components/servicer/Eventservicer'
import CreateEvent from './components/servicer/CreateEvent'
import EventCarousel from './components/user/EventCarousel';
import CategoryServicer from './components/servicer/CategoryServicer'
import CreateMenu from './components/admin/CreateMenu'
import CreateCategory from './components/servicer/CreateCategory'
import CategoryList from './components/admin/CategoryList'
import MenuList from './components/admin/MenuList'
import EventDetail from "./components/servicer/DetailedEvent";
import Menu from "./components/user/Menu";

import OrderConfirmation from './components/user/OrderConfirmation';
import CreateSlot from './components/servicer/CreateSlot';
import Bookings from './components/user/MyBookings';
import OrderStatus from './components/user//OrderStatus';
import AllBookings from './components/admin/Bookings';
import ServicerBookings from './components/servicer/Bookings';
import ServicerDashboard from './components/servicer/ServicerDashboard';
import Chat from './components/chat/Chat';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/adminhome' exact Component={AdminHome} />
          <Route path='/' exact Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/servicersignup' Component={Servicerregister}/>
          <Route path='/servicersignin' Component={LoginServicer}/>
          <Route path='/profile' exact Component={Profile} />
          <Route path='/user' Component={User} />
          <Route path='/home-list-event' exact Component={Event1} />
          <Route path='/servicer' Component={Servicer} />
          <Route path='/events' Component={Events} />
          <Route path='/single-view/:id' Component={SingleView} />
          <Route path='/dashboards' Component={Dashboards} />
          <Route path='/eventservicer' Component={Eventservicer} />
          <Route path='/createevent' Component={CreateEvent}/>
          <Route path="/events/:id" component={EventCarousel} /> 
          <Route path='/categoryservicer' Component={CategoryServicer}/>
          <Route path='/createcategory' Component={CreateCategory}/>
          <Route path='/createmenu' Component={CreateMenu}/>
          <Route path='/categories1' Component={CategoryList} />
          <Route path='/menuList' Component={MenuList} />
          <Route path='/singleeventdetail/:id' exact Component={EventDetail}/>
          <Route path='/menu' Component={Menu} />
          <Route path="/orderconfirmation/:id" Component={OrderConfirmation} />
          <Route path='/createslot/:id' Component={CreateSlot}/>
          <Route path='/mybookings' exact Component={Bookings} />
          <Route path="/order-status" Component={OrderStatus} />
          <Route path='/allbookings' Component={AllBookings} />
          <Route path='/servicerbookings' Component={ServicerBookings}/>
          <Route path="/servicerdashboard" Component={ServicerDashboard} />
          <Route path="/chat" Component={Chat} />
        

          
        </Routes>
      </Router>
    </div>
  );
  }

export default App;
