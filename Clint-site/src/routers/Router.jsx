import { createBrowserRouter } from "react-router";
// main layout and pages in landing home page
import RootLayout from "../layout/RootLayout.jsx";
import Home from "../pages/home/Home.jsx";
// private route for protected routes
import PrivateRoute from "./PrivateRoute.jsx";
import Books from "../pages/books/Books.jsx";
// authentication layout and pages
import AuthLayout from "../layout/authLayout.jsx";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import SendParcel from "../pages/sendParcel/SendParcel.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import MyParcels from "../pages/dashboard/MyParcels.jsx";
// coverage area page with maps
import Coverage from "../pages/coverage/Coverage.jsx";
// 404 Not found page
import NotFound from "../pages/notFound/NotFound.jsx";
import Payment from "../pages/dashboard/Payment.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <Books />
          </PrivateRoute>
        ),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("./data/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/maps",
        Component: Coverage,
        loader: () => fetch("./data/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/my-parcel",
        Component: MyParcels,
      },
      {
        path: "/payment/:parcelId",
        Component: Payment,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
