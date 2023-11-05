import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import SignIn from './Auth/SignIn/SignIn';
import ContactUs from './pages/contact/ContactUs';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import QuitSmoking from './pages/profile/quit_smoking/QuitSmoking';
import TaskHistory from './pages/profile/quit_smoking/TaskHistory';
import Blogs from './pages/Blogs/Blogs';
import Info_blog from './pages/Blogs/blog/Info-blog';
import { ContextAuthProvider } from "./Auth/ConditionAuth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/quit-smoking",
          element: <QuitSmoking />,
        },
        {
          path: "/task-history",
          element: <TaskHistory />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/blog/:blogId",
          element: <Info_blog />,
        },
      ],
    },
  ]);
  return (
    <ContextAuthProvider>
      <RouterProvider router={router} />
    </ContextAuthProvider>
  );
}

export default App;
