import { createContext, useState } from "react";

export const CaptainContext = createContext(null);

const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider;