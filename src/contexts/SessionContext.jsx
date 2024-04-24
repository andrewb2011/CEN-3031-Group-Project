import { createContext, useContext } from "react";
import { useAuth } from "../features/authentication/hooks/useAuth";
import PropTypes from "prop-types";

//1. create context
const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, isLoadingSessionData] = useAuth();

  return (
    //2. Provide context to children
    <SessionContext.Provider
      value={{
        session,
        isLoadingSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("Attempted to use SessionContext outside of served area");
  return context;
}

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children can be any renderable React node
};
