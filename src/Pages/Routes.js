import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../Contexts/Auth";
import { ROLE_IN_WORD } from "../enum";
import NotFound from "./NotFound";
import UserRoute from "./User";

const NotFoundRoute = () => {
  return(
    <Switch>
      <Route path="/">
        <></>
      </Route>
      <Route path={`/not-found`}>
        <NotFound />
      </Route>
      <Route path="*">
        <Redirect to={`/not-found`} />
      </Route>
    </Switch>
  );
}

const Routes = () => {
  const { auth } = useAuth();
  switch(auth.role) {
    case ROLE_IN_WORD.USER:
      return <UserRoute />
    default:
      return <NotFoundRoute  />
  }
}

export default Routes;
