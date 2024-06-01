import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section class="page_404" style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-sm-10 col-sm-offset-1  text-center">
          <div class="four_zero_four_bg">
            <h1 class="text-center ">404</h1>
          </div>

          <div>
            <div>
              <h3 class="h2">Look like you're lost</h3>

              <p>the page you are looking for not avaible!</p>

              <Link to={"/login"} class="link_404">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
