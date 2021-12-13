import { createContext, useReducer, useMemo, useContext} from "react";

const ToastContext = createContext();

const initialToastState = {
  isOpen: false,
  message: ""
};

function ToastReducer(state, action) {
  switch (action.type) {
    case "SET_TOAST": {
      return {
        isOpen: true,
        message: action.payload
      };
    }
    case "UNSET_TOAST": {
      return initialToastState;
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function ToastProvider(props) {
  const [state, dispatch] = useReducer(ToastReducer, initialToastState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <ToastContext.Provider value={value} {...props} />
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(`useToast must be used within a ToastProvider`);
  }
  const [state, dispatch] = context;

  const openToast = (payload) => {
    dispatch({ type: "SET_TOAST", payload })
  };

  const closeToast = () => {
    dispatch({ type: "UNSET_TOAST" })
  };

  return { toast: state, openToast, closeToast };
}
