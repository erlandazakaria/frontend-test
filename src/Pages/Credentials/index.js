import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import NotFound from "../NotFound";

const Credentials = () => {

  return(
    <Switch>
      <Route exact path={"/"}>
        <Login />
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

export default Credentials;
