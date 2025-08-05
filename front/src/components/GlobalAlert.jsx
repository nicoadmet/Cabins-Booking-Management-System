import { useAlert } from "../context/AlertContext";

const GlobalAlert = () => {
  const { alert } = useAlert();

  if (!alert.message) return null;

  return (
    <div
      className={`alert alert-${alert.type} position-fixed top-0 end-0 m-4 shadow rounded`}
      style={{ zIndex: 9999, minWidth: "250px" }}
      role="alert"
    >
      {alert.message}
    </div>
  );
};

export default GlobalAlert;
