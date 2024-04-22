import { useState } from 'react';
import LoginComponent from '../LoginComponent';
import NavMenu from './NavMenu';

const title = 'BALENCIAGA';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <header>
      <div className='flex justify-center align-center font-bold'>
        <h1 className='text-xl content-center justify-center'>{title}</h1>
      </div>
      <nav>
        <ul className='flex gap-14 justify-center'>
          <li className='relative'>
            <button onClick={() => handleMenuClick('summer')}>Été 24</button>
            {activeMenu === 'summer' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <button onClick={() => handleMenuClick('city')}>Le city</button>
            {activeMenu === 'city' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <button onClick={() => handleMenuClick('woman')}>Femme</button>
            {activeMenu === 'woman' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <button onClick={() => handleMenuClick('man')}>Homme</button>
            {activeMenu === 'man' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <button onClick={() => handleMenuClick('couture')}>Couture</button>
            {activeMenu === 'couture' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <button onClick={() => handleMenuClick('explore')}>Explore</button>
            {activeMenu === 'explore' && (
              <NavMenu />
            )}
          </li>
          <li className='relative'>
            <LoginComponent />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
