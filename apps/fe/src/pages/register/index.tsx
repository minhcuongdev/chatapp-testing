import { useState } from "react";
import { useRegister } from "../../services/auth/auth.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const registerMutation = useRegister(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: 'user',
        });
        navigate('/login')
      }
    }
  )
  const handleSubmit = () => {
    console.log(email, password)
    registerMutation.mutate({
      name: user,
      email,
      password,
    });
  }
  return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="w-[400px] mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">User Name</label>
          <input
            value={user}
            onChange={e => setUser(e.target.value)}
            type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <button onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
}
export default Register
