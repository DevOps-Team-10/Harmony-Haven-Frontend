import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react'; // Import useEffect and useRef
import UserContext from '../context/UserContext.js';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  useEffect(() => {
    // Add event listener to the document body to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.body.addEventListener('click', handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  const handleLogout = async () => {
    const res = await fetch("/user/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
      }
    });
    const data = await res.json();
    setUser(null);
    alert(data?.message);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <header className="bg-lime-700 text-white p-4 rounded-lg shadow-lg flex justify-between items-center w-11/12 m-auto my-2">
      <div className="flex items-center">
        <img src="app-logo.png" alt="app-logo" className="h-14 w-14 mr-2 rounded-md" />
        <span className="text-2xl font-bold text-gray-300">Harmony Heaven</span>
        <ul className="flex space-x-4 ml-8">
          <li>
            <Link to='/' className=" bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to='/events' className="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Events
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li className="relative" ref={dropdownRef}> {/* Attach the ref to the container */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Profile
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <li>
                  <Link to='/about-me' className="block px-4 py-2 hover:bg-gray-200">
                    Profile Details
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
