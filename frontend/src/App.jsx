import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import CreateOrder from './components/CreateOrder';
import CollectorForm from './components/CollectorForm';
import ResidentialSorterForm from './components/ResidentialSorterForm';
import TransportForm from './components/TransportForm';
import DestinationSorterForm from './components/DestinationSorterForm';
import DistributorForm from './components/DistributorForm';
import CustomerConfirm from './components/CustomerConfirm';
import OrderTracker from './components/OrderTracker';
import SorterForm from './components/SorterForm'; 


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/collector" element={<CollectorForm />} />
          <Route path="/sorter" element={<SorterForm />} />
          <Route path="/transport" element={<TransportForm />} />
          <Route path="/distributor" element={<DistributorForm />} />
          <Route path="/customer" element={<CustomerConfirm />} />
          <Route path="/track" element={<OrderTracker />} />
          <Route path="/residential-sorter" element={<ResidentialSorterForm />} />
          <Route path="/destination-sorter" element={<DestinationSorterForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
