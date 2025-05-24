import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🍱 Dabbawala Dashboard</div>
      <ul className="nav-links">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/create-order">Provider</Link></li>
        <li><Link to="/collector">Collector</Link></li>
        <li><Link to="/destination-sorter">Destination Sorter</Link></li>
        <li><Link to="/transport">Transporter</Link></li>
        <li><Link to="/residential-sorter">Residential Sorter</Link></li>
        <li><Link to="/distributor">Distributor</Link></li>
        <li><Link to="/customer">Customer</Link></li>
        <li><Link to="/track">Track</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
