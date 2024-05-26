import { Link, useRouteError } from 'react-router-dom';


const Error = () => {
    const err = useRouteError()
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="mb-4">
                    <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
                <p className="text-gray-600 mb-6">{err.status}: {err.statusText}</p>
                <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
