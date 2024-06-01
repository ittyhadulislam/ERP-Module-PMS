import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Register from "./page/Register";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import { routes } from "./routes/routes";
import NotFound from "./page/NotFound";
import AuthCheck from "./components/common/AuthCheck";
import { Suspense } from "react";
import PageLoading from "./components/common/pageLoading/PageLoading";
import LoginNew from "./page/login/LoginNew";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <AuthCheck />
  ) : (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginNew />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Suspense fallback={<PageLoading />}>
                    {route.element}
                  </Suspense>
                </PrivateRoute>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
