import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";

import { useAuth } from "./Contexts/Auth";
import { IS_LOGGED_IN } from "./Queries/User";

import { FirstLoading } from "./Components/Loading";
import Layout from "./Pages/Layout";
import Credentials from "./Pages/Credentials";

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const { checkAuth } = useAuth();
  const [ isLoaded, setLoad ] = useState(false);

  useEffect(() => {
    moment.locale("en-gb");
    checkAuth();
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  // eslint-disable-next-line
  }, []);

  if(!isLoaded) {
    return <FirstLoading />
  } else {
    return data && data.isLoggedIn ? <Layout /> : <Credentials />
  }
}

export default App;
