import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

/*
	Ywitter의 Router
	로그인이 되어 있다면 Home을, 아니라면 로그인을 담당하는 페이지(Auth)를 렌더링
*/

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      <div className="app-router">
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
