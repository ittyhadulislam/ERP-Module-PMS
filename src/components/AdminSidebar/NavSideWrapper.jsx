/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavSideWrapper = ({ children }) => {
  const currentPath = useLocation().pathname;
  const handleCloseSidebar = () => {
    const isOpen = document.getElementById("body").className;
    if (
      isOpen === "sidebar-mini layout-fixed sidebar-open" ||
      isOpen ===
        "sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed sidebar-open"
    ) {
      document.getElementById("body").className =
        "sidebar-mini layout-fixed sidebar-collapse";
    }
  };

  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (screenWidth < 992) {
      document.getElementById("body").className =
        "sidebar-mini layout-fixed sidebar-collapse";
    }
  }, [currentPath]);

  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="content-wrapper"
        style={{ height: "85vh" }}
        onClick={handleCloseSidebar}
      >
        <div className="custom-container">
          <div className="custom-content  p-4">{children}</div>
          <div className="footer-fixed-bottom">
            <Footer /> {/* <!-- Your fixed element at the bottom --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSideWrapper;
