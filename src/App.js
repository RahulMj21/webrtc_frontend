import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Greeting from "./pages/Greeting";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import Rooms from "./pages/Rooms";
import { selectIsUser, selectUserIsActivate } from "./features/authSlice";
import { useSelector } from "react-redux";
import { useLoading } from "./hooks/useLoading";
import Loader from "./pages/Loader";
import SingleRoom from "./pages/SingleRoom";

function App() {
  const { loading } = useLoading();
  const isAuth = useSelector(selectIsUser);
  const isActivated = useSelector(selectUserIsActivate);

  function GuestRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth && isActivated ? (
            <Redirect
              to={{
                pathname: "/rooms",
                state: { from: location },
              }}
            />
          ) : isAuth && !isActivated ? (
            <Redirect
              to={{
                pathname: "/activate",
                state: { from: location },
              }}
            />
          ) : (
            children
          );
        }}
      ></Route>
    );
  }
  function LoginRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth && isActivated ? (
            <Redirect
              to={{
                pathname: "/rooms",
                state: { from: location },
              }}
            />
          ) : isAuth && !isActivated ? (
            <Redirect
              to={{
                pathname: "/activate",
                state: { from: location },
              }}
            />
          ) : (
            children
          );
        }}
      ></Route>
    );
  }
  function ActivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth && isActivated ? (
            <Redirect
              to={{
                pathname: "/rooms",
                state: { from: location },
              }}
            />
          ) : !isAuth ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          ) : (
            children
          );
        }}
      ></Route>
    );
  }
  function ProtectedRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return !isAuth ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          ) : isAuth && !isActivated ? (
            <Redirect
              to={{
                pathname: "/activate",
                state: { from: location },
              }}
            />
          ) : (
            children
          );
        }}
      ></Route>
    );
  }

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header />
          <Switch>
            <GuestRoute path="/" exact>
              <Greeting />
            </GuestRoute>
            <LoginRoute path="/login" exact>
              <Login />
            </LoginRoute>
            <ActivateRoute path="/activate" exact>
              <Activate />
            </ActivateRoute>
            <ProtectedRoute path="/rooms" exact>
              <Rooms />
            </ProtectedRoute>
            <ProtectedRoute path="/room/:_id" exact>
              <SingleRoom />
            </ProtectedRoute>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
