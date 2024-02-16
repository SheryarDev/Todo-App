import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/Signin';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
