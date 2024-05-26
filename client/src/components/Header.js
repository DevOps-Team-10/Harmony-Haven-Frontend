import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-black text-white p-4 rounded-lg shadow-lg flex justify-between items-center w-11/12 m-auto my-2">
            <div className="flex items-center">
                <img src="app-logo.png" alt="app-logo" className="h-14 w-14 mr-2 rounded-md" />
                <span className="text-2xl font-bold text-gray-300">Harmony Heaven</span>
            </div>
            <div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to='/' className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/events' className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile' className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
