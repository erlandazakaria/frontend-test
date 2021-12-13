import { createContext, useReducer, useMemo, useContext} from "react";
import { gqlClient } from "../config";
import { ALL_RESTAURANT } from "../Queries/Restaurant";

const RestaurantContext = createContext();

const initialRestaurantState = [];

function RestaurantReducer(state, action) {
  switch (action.type) {
    case "SET_RESTAURANT": {
      return action.payload;
    }
    case "UNSET_RESTAURANT": {
      return initialRestaurantState;
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function RestaurantProvider(props) {
  const [state, dispatch] = useReducer(RestaurantReducer, initialRestaurantState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <RestaurantContext.Provider value={value} {...props} />
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(`useRestaurant must be used within a RestaurantProvider`);
  }
  const [state, dispatch] = context;

  const loadRestaurant = async () => {
    const { data } = await gqlClient.query({
      query: ALL_RESTAURANT
    });
    if(data) {
      dispatch({ type: "SET_RESTAURANT", payload: data.getAllRestaurant })
      return { error: false }
    }
  };

  const cleanRestaurant = () => {
    dispatch({ type: "UNSET_RESTAURANT" })
  };

  return { restaurants: state, loadRestaurant, cleanRestaurant };
}
