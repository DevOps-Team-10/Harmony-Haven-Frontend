import { LOGO } from '../constants';
import { useState } from 'react'
const Login = () => {
    const [account, toggleAccount] = useState('login')

    const LoginComponent = () => {return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
                <img src={LOGO} alt="logo" className="w-36 mx-auto mb-8" />
                <input type="email" className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none" placeholder="Email" />
                <input type="password" className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none" placeholder="Password" />
                <div className="flex justify-between">
                    <button className="w-1/2 px-4 py-2 mr-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Login</button>
                    <button className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600" onClick={()=> toggleAccount("signup")}>Sign Up</button>
                </div>
            </div>
        </div>
    )}

    const SignUp = () => {return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
                <img src={LOGO} alt="logo" className="w-36 mx-auto mb-8" />
                <input type="text" className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none" placeholder="Name" />
                <input type="email" className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none" placeholder="Email" />
                <input type="password" className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none" placeholder="Password" />
                <div className="flex justify-between">
                    <button className="w-1/2 px-4 py-2 mr-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Sign In</button>
                    <button className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600" onClick={() => toggleAccount("login")}>Account exists</button>
                </div>
            </div>
        </div>
    )}
    return (
       account === 'login' ? <LoginComponent /> : <SignUp />
    );
};

export default Login;
