import { createBrowserRouter, redirect } from 'react-router-dom';
import LayoutRoot from '../_layouts/root';
import Login from './login';
import Register from './register';
import Chat from './chat';
const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/chat',
  NOT_FOUND: '/404',
};
export const router = createBrowserRouter([
  {
    element: <LayoutRoot />,
    path: PATH.HOME,
    children: [
      {
        index: true,
        loader: () => {
          if (!sessionStorage.getItem('userId')) {
            return redirect(`/login`);
          }
          return redirect(`/chat`);
        },
        element: <div>Home Page</div>,
      },

      {
        element: <Login />,
        path: PATH.LOGIN,
      },
      {
        element: <Register />,
        path: PATH.REGISTER,
      },
    ],
  },
  {
    element: <Chat />,
    loader: () => {
      if (!sessionStorage.getItem('userId')) {
        return redirect(`/login`);
      }
      return null;
    },
    path: PATH.CHAT,
  },
  {
    path: PATH.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
]);
