import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/debonair_logo_dark.svg";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FaRegHandPointRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMenuPermissionMutation } from "../../redux/features/permission/permissionApi";
import { menuName } from "./menu";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useSelector((state) => state.auth);

  const [menuPermission, { data }] = useMenuPermissionMutation();

  // ---- permission menu payload ----
  const payloadArray = [];

  menuName.map((menu) =>
    menu.subMenu.map((sub) => {
      payloadArray.push({ menuText: menu.title, userName: user.userName });
      payloadArray.push({ menuText: sub.name, userName: user.userName });
    })
  );

  useEffect(() => {
    menuPermission(payloadArray);
  }, []);
  // ---- permission menu payload ----

  return (
    <aside className="main-sidebar sidebar-dark-primary ">
      {/* <!-- Brand Logo --> */}
      <Link to={"/"} className="brand-link">
        <img
          src={logo}
          height="100%"
          width="100%"
          alt="Debonair Logo"
          className="brand-image  elevation-3"
        />
        <span className="brand-text font-weight-light ">Debonair Group</span>
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {data !== undefined &&
              menuName.map((menu, i) => (
                <div key={i}>
                  {data?.some((item) => item.menuText === menu.title) ? null : (
                    <Accordion
                      elevation={0}
                      sx={{
                        width: "100%",
                        background: menu.subMenu.find(
                          (e) => e.path === currentPath
                        )
                          ? "#2d2c2c"
                          : "transparent",
                      }}
                    >
                      <a className={`nav-link w-100 p-0`}>
                        <AccordionSummary
                          expandIcon={
                            <i className="right fas fa-angle-down text-white icon-hide"></i>
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            width: "100%",
                            py: 0,
                            m: 0,
                            minHeight: "40px !important",
                            "& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded , .css-o4b71y-MuiAccordionSummary-content":
                            {
                              margin: "12px",
                              marginLeft: "0px",
                              alignItems: "center",
                            },
                          }}
                        >
                          {/* <i class="nav-icon fas fa-scissors text-danger"></i> */}
                          <span style={{ fontSize: "20px" }}>{menu?.icon}</span>
                          {/* <i className="nav-icon fas fa-tachometer-alt text-danger"></i> */}
                          <p style={{ paddingLeft: "5px" }}>{menu.title}</p>
                        </AccordionSummary>
                      </a>
                      <AccordionDetails sx={{ padding: 0 }}>
                        {menu?.subMenu?.map((menu, index) => {
                          return (
                            <div key={index}>
                              {data?.some(
                                (item) => item.menuText === menu.name
                              ) ? null : (
                                <li className="nav-item">
                                  <Link
                                    to={menu?.path}
                                    className={`nav-link ${currentPath === menu.path && "active"
                                      }`}
                                  >
                                    {/* <i className="far fa-circle nav-icon"></i> */}
                                    <FaRegHandPointRight color="#1cc1bbbf" />
                                    {
                                      <p style={{ marginLeft: "10px" }}>
                                        {" "}
                                        {menu.name}
                                      </p>
                                    }
                                  </Link>
                                </li>
                              )}
                            </div>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  )}
                </div>
              ))}

            {/* <li className="nav-item">
              <Link
                to={"/master-setting"}
                className={`nav-link ${
                  currentPath === "/master-setting" && "active"
                }`}
              >
                <i className="nav-icon fas fa-cogs"></i>
                <p>
                  Master Setting
                  <span className="right badge badge-danger">New</span>
                </p>
              </Link>
            </li> */}
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
};

export default SideBar;
