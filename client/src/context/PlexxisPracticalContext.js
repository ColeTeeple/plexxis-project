import React, { useState, useContext, createContext } from "react";

const PlexxisPracticalContext = createContext();

export function usePlexxisPracticalContext() {
  return useContext(PlexxisPracticalContext);
}

export const PlexxisPracticalContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink"];
  const branches = ["Abacus", "Pillsworth", "Victoria"];
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <PlexxisPracticalContext.Provider value={{ employees, setEmployees, colors, branches, API_URL }}>
      {children}
    </PlexxisPracticalContext.Provider>
  );
};
