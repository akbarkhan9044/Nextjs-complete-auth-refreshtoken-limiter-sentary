// Example Navbar.jsx file
import { NavbarBannerRow } from './NavbarBanner'; // Importing Option A

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: 'white' }}>
      {/* Logo */}
      <div style={{ marginRight: 'auto', fontWeight: 'bold' }}>LOGO</div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1rem', marginRight: '2rem' }}>
        <a href="#">Home</a>
        <a href="#">Shop</a>
      </div>

      {/* THE 300px BANNER */}
      <NavbarBannerRow />
      
      {/* Other icons like cart, profile, etc. */}
      <div style={{ marginLeft: '2rem' }}>🛒</div>
    </nav>
  );
};

export default Navbar;