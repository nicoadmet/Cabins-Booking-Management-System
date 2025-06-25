import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AdminBookings = () => {
  const [bookings, setBooking] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch("http://localhost:3000/api/booking")
      .then(res => res.json())
      .then(data => setBooking(data))
      .catch(error => console.error("Error al obtener reservas:", error));
  }, []);

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => setAlert({ message: '', type: '' }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que querés eliminar esta reserva?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/booking/${id}`, {
        method: "DELETE",
      });
      setBooking(bookings.filter((booking) => booking.id !== id));
      setAlert({ message: "Reserva eliminada correctamente", type: "success" });
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      setAlert({ message: "Hubo un error al eliminar la reserva.", type: "danger" });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingBooking.startDate || !editingBooking.endDate || !editingBooking.userId || !editingBooking.cabinId) {
      setAlert({ message: "Todos los campos son obligatorios", type: "danger" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/booking/${editingBooking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingBooking)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ message: "Error: " + errorData.message, type: "danger" });
        return;
      }

      setBooking(bookings.map((booking) => (
        booking.id === editingBooking.id ? editingBooking : booking
      )));
      setEditingBooking(null);
      setAlert({ message: "Reserva actualizada", type: "success" });

    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      setAlert({ message: "Hubo un error al actualizar la reserva.", type: "danger" });
    }
  };

  return (
    <div className="position-relative">

      {alert.message && (
        <div
          className={`alert alert-${alert.type} position-fixed top-0 end-0 m-4 shadow rounded`}
          style={{ zIndex: 9999, minWidth: '250px' }}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      <div className="position-absolute top-0 start-0 m-4">
        <Link to="/adminPanel" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
      </div>

      <h2 className="m-4 text-center">Administrar Reservas</h2>

      {bookings.length === 0 ? (
        <p className="text-center">No hay reservas.</p>
      ) : (
        <table className="table table-hover table-striped table-bordered align-middle text-center shadow-sm rounded">
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Id Usuario</th>
              <th>Id Cabaña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.userId}</td>
                <td>{booking.cabinId}</td>
                <td>
                  <button
                    className="btn btn-primary p-1 m-1"
                    onClick={() => setEditingBooking(booking)}
                  >
                    <i className="bi bi-pencil-square m-1"></i>Editar
                  </button>
                  <button
                    className="btn btn-danger p-1 m-1"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <i className="bi bi-trash m-1"></i>Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingBooking && (
        <form
          onSubmit={handleUpdate}
          className="p-4 border rounded shadow-sm bg-light w-100"
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <h4 className="mb-4 text-center">Editar Reserva</h4>

          <div className="mb-3">
            <label className="form-label">Fecha de inicio</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={editingBooking.startDate ? editingBooking.startDate.slice(0, 10) : ""}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, startDate: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de fin</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={editingBooking.endDate ? editingBooking.endDate.slice(0, 10) : ""}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, endDate: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ID Usuario</label>
            <input
              type="number"
              className="form-control"
              name="userId"
              value={editingBooking.userId}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, userId: parseInt(e.target.value) })
              }
              placeholder="ID Usuario"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ID Cabaña</label>
            <input
              type="number"
              className="form-control"
              name="cabinId"
              value={editingBooking.cabinId}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, cabinId: parseInt(e.target.value) })
              }
              placeholder="ID Cabaña"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-danger" onClick={() => setEditingBooking(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminBookings;
