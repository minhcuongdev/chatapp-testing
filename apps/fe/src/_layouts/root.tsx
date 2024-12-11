import { Outlet } from 'react-router-dom';

const LayoutRoot = () => {
  return (
    <div className="mx-auto h-screen w-[70%] bg-blue-300">
      <Outlet />
    </div>
  );
};

export default LayoutRoot;
