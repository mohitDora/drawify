"use client";
import React, { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_TOOL":
        return {
            ...state,selectedTool:action.tool
        }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const initialState = {
    shapes: [],
    selectedTool: "pen",
    undoStack:[],
    redoStack: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  return useContext(StoreContext);
};
