import { Outlet } from "react-router-dom";
import Header from "../pages/header/Header.jsx";
import Footer from "../pages/footer/Footer";
//  bg-base-200
function RootLayout() {
  return (
    <div className="min-h-screen w-[85%] mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
