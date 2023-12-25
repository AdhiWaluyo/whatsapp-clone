// stateProvider.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import { AppState, Action } from "./reducer";

interface StateProviderProps {
  reducer: (state: AppState, action: Action) => AppState;
  initialState: AppState;
  children: ReactNode;
}

interface StateContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const StateContext = createContext<StateContextProps | undefined>(
  undefined
);

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): [AppState, Dispatch<Action>] => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return [context.state, context.dispatch];
};
