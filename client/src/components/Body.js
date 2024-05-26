import { Link } from "react-router-dom";
const Body = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="mb-8 grid grid-cols-2 gap-4">
                <Link to='/shop'><button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-6 px-12 rounded-lg transition-colors duration-300">
                    Shop
                </button></Link>
                <Link to='/blog'><button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-6 px-12 rounded-lg transition-colors duration-300">
                    Blog
                </button> </Link>
                <Link to='/learn'> <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg transition-colors duration-300">
                    Learn
                </button></Link>
                <Link to='/track'><button className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-6 px-12 rounded-lg transition-colors duration-300">
                    Track
                </button></Link>
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to Harmony Heaven.
                    <br />
                    One stop solution to being fit.
                </h1>
            </div>
        </div>
    )
}

export default Body;
