import { createContext, useEffect, useReducer } from "react";

// Initial state
const initial_state = {
  user:
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("LOGIN_START dispatched");
      return { user: null, token: null, role: null };

    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS dispatched:", action.payload);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };

    case "LOGOUT":
      console.log("LOGOUT dispatched");
      return { user: null, token: null, role: null };

    case "UPDATE_USER":
      console.log("UPDATE_USER dispatched:", action.payload.user);
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    console.log("AuthContext state updated:", state);
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
      localStorage.setItem("role", state.role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [state.user, state.token, state.role]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
