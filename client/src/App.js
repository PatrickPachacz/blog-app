import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Write from "./pages/Write"
import Single from "./pages/Single"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Blog from "./pages/Blog"
import "./style.scss"
import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      {
        path: "write",
        element: <Write />
      },
      {
        path: "post/:id",
        element: <Single />
      },
      {
        path: "",
        element: <Home />
      },
      {
        path: "/blog",
        element: <Blog />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },

  
])


function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}



export default App;



