import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const LayoutRoot = () => {
  return (
    <div className="mx-auto h-screen w-screen bg-blue-300">
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LayoutRoot;
