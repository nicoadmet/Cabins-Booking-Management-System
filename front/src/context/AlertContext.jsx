import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "", redirectTo: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => {
        if (alert.redirectTo) {
          navigate(alert.redirectTo);
        }
        setAlert({ message: "", type: "" });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [alert, navigate]);


  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
