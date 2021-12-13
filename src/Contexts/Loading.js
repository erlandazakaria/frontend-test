import { createContext, useReducer, useMemo, useContext} from "react";

const LoadingContext = createContext();

const initialLoadingState = false;

function LoadingReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING": {
      return action.payload;
    }
    case "UNSET_LOADING": {
      return initialLoadingState;
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function LoadingProvider(props) {
  const [state, dispatch] = useReducer(LoadingReducer, initialLoadingState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <LoadingContext.Provider value={value} {...props} />
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(`useLoading must be used within a LoadingProvider`);
  }
  const [state, dispatch] = context;

  const openLoading = (payload) => {
    dispatch({ type: "SET_LOADING", payload })
  };

  const closeLoading = () => {
    dispatch({ type: "UNSET_LOADING" })
  };

  return { isLoading: state, openLoading, closeLoading };
}
