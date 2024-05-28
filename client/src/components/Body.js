import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/shop">
          <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-8 px-16 rounded-lg transition-colors duration-300 w-full shadow-lg">
            Exploring Herbal Product Offerings
          </button>
        </Link>
        <Link to="/blog">
          <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-8 px-16 rounded-lg transition-colors duration-300 w-full shadow-lg">
            Discovering Spiritual Practices and Rituals
          </button>
        </Link>
        <Link to="/learn">
          <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-8 px-16 rounded-lg transition-colors duration-300 w-full shadow-lg">
            Accessing Resources and Insights
          </button>
        </Link>
        <Link to="/track">
          <button className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-8 px-16 rounded-lg transition-colors duration-300 w-full shadow-lg">
            Tracking and Monitoring Progress
          </button>
        </Link>
        <Link to="/community">
        <button className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-bold py-8 px-16 rounded-lg transition-colors duration-300 w-full shadow-lg">
          Connecting with Like-minded Community
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Harmony Heaven.
          <br />
          One stop solution to being fit.
        </h1>
      </div>
    </div>
  );
};

export default Body;
