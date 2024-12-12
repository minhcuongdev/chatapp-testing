// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '../pages/routes';

export function App() {
  return <RouterProvider router={router()} />;
}

export default App;
