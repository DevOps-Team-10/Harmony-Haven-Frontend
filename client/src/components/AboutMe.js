import React, { useContext } from 'react';
import UserContext from '../context/UserContext.js';

const AboutMe = () => {
  const user = useContext(UserContext);
  console.log("User: ", user)
  const email = "email"
  const username = "username"
  return (
    <div className="container mx-auto mt-10 w-4/12 ">
      <h1 className="text-3xl font-semibold mb-5">About Me</h1>
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-2xl">
          <p className="mb-3"><strong>Username: </strong> {user.user.name}</p>
          <p className="mb-3"><strong>Email: </strong> {user.user.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default AboutMe;
