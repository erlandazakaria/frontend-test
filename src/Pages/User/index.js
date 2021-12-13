import { Switch, Route, Redirect } from "react-router-dom";
import UserDashboard from "../TempHome";
import { MyCollections } from "../MyCollections";
import NotFound from "../NotFound";

const UserRoute = () => {
  return(
    <Switch>
      <Route exact path={"/"}>
        <UserDashboard />
      </Route>
      <Route exact path={"/my-collections"}>
        <MyCollections />
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

export default UserRoute;
