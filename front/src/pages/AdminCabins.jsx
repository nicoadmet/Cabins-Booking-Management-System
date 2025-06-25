import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


export const AdminCabins = () => {
  const [cabins, setCabins] = useState([]);
  const [editingCabin, setEditingCabin] = useState(null);
  const [newCabin, setNewcabin] = useState({  
    name: '',
    description: '',
    pricePerNight: '',
    capacity: '',
    isAvailable: true,
    imageUrl: '' 
  })
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
  fetch("http://localhost:3000/api/cabin")
    .then(res => res.json())
    .then(data => setCabins(data))
    .catch(error => console.error("Error al obtener cabañas:", error));
  }, []);


  const handleAddCabin = () => {
    setEditingCabin(null);
    setNewcabin({
      name: '',
      description: '',
      pricePerNight: '',
      capacity: '',
      isAvailable: true,
      imageUrl: ''
    })
    setShowForm(true);
  }

  const handleChangeNewCabin = (e) => {
    setNewcabin({ 
      ...newCabin,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      //editar cabaña
      if (editingCabin) {
        response = await fetch(`http://localhost:3000/api/cabin/${editingCabin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCabin)
        });
      } else {
          //agregar cabaña 
          response = await fetch("http://localhost:3000/api/cabin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCabin),
        });
      }

      if (!response.ok) {
          const errorData = await response.json();
          alert("Error: " + errorData.message);
          return;
      }

      const savedCabin = await response.json();

      if (editingCabin) {
        //actualiza la lista remplazando a la cabaña que edito
        setCabins(cabins.map(cabin => cabin.id === savedCabin.id ? savedCabin : cabin))
      } else {
        //agrega la cabaña nueva a la lista
        setCabins([...cabins, savedCabin]);
      }

      setShowForm(false);
      setEditingCabin(null)
      setNewcabin({
        name: '',
        description: '',
        pricePerNight: '',
        capacity: '',
        isAvailable: true,
        imageUrl: '',
      });  
    } catch (error) {
      console.error(error);
      alert("Hubo un problema guardando la cabaña.");
    }
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que querés eliminar esta cabaña?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/cabin/${id}`, {
        method: "DELETE",
      });
      setCabins(cabins.filter((cabin) => cabin.id !==id));
    } catch (error) {
      console.error("Error al eliminar cabaña:", error);
    }
  };


  return (
    <div>

      <div className="position-absolute top-0 start-0 m-4">
        <Link to="/adminPanel" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
      </div>

        <h2 className="m-4 text-center">Administrar Cabañas</h2>
        <button class="btn btn-success m-3" onClick={handleAddCabin}><i class="bi bi-plus-lg m-1 p-1"></i>Agregar Cabaña</button>

        <table className="table table-hover table-striped table-bordered align-middle text-center shadow-sm rounded">
  <thead>
    <tr>
      <th>Id</th>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Precio Por Noche</th>
      <th>Capacidad</th>
      <th>Disponible</th>
      <th style={{ maxWidth: '150px' }}>Url</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {cabins.map((cabin) => (
      <tr key={cabin.id}>
        <td>{cabin.id}</td>
        <td>{cabin.name}</td>
        <td>{cabin.description}</td>
        <td>{cabin.pricePerNight}</td>
        <td>{cabin.capacity}</td>
        <td>{cabin.isAvailable ? (<i className="bi bi-check-circle-fill text-success fs-5"></i>) : (<i className="bi bi-x-circle-fill text-danger fs-5"></i>)}</td>

        <td>
          <div
            className="text-truncate"
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              margin: '0 auto'
            }}
            title={cabin.imageUrl}>
            {cabin.imageUrl}
          </div>
        </td>

        <td>
          <button className="btn btn-primary p-1 m-1" onClick={() => {
            setEditingCabin(cabin);
            setNewcabin(cabin);
            setShowForm(true);
          }}>
            <i className="bi bi-pencil-square m-1"></i>Editar</button>
          <button className="btn btn-danger p-1 m-1" onClick={() => handleDelete(cabin.id)}>
            <i className="bi bi-trash m-1"></i>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        {showForm && (
  <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light w-100" style={{ maxWidth: '500px', margin: '0 auto' }}>
    <h4 className="mb-4 text-center">{editingCabin ? "Editar Cabaña" : "Agregar Cabaña"}</h4>

    <div className="mb-3">
      <label className="form-label">Nombre</label>
      <input 
        type="text" 
        className="form-control"
        placeholder="Nombre"
        value={newCabin.name}
        name="name"
        onChange={handleChangeNewCabin}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Descripción</label>
      <input
        type="text"
        className="form-control"
        placeholder="Descripción"
        value={newCabin.description}
        name="description"
        onChange={handleChangeNewCabin}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Precio por noche</label>
      <input
        type="number"
        className="form-control"
        placeholder="Precio por noche"
        value={newCabin.pricePerNight}
        name="pricePerNight"
        onChange={handleChangeNewCabin}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Capacidad</label>
      <input
        type="number"
        className="form-control"
        placeholder="Capacidad"
        value={newCabin.capacity}
        name="capacity"
        onChange={handleChangeNewCabin}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">URL de imagen</label>
      <input
        type="text"
        className="form-control"
        placeholder="URL de imagen"
        value={newCabin.imageUrl}
        name="imageUrl"
        onChange={handleChangeNewCabin}
      />
    </div>

    <div className="form-check form-switch mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        checked={newCabin.isAvailable}
        name="isAvailable"
        id="disponibleSwitch"
        onChange={(e) => setNewcabin({ ...newCabin, isAvailable: e.target.checked })}
      />
      <label className="form-check-label" htmlFor="disponibleSwitch">Disponible</label>
    </div>

    <div className="d-flex justify-content-between">
      <button type="submit" className="btn btn-success">
        {editingCabin ? "Guardar cambios" : "Agregar"}
      </button>
      <button type="button" className="btn btn-danger" onClick={() => setShowForm(false)}>Cancelar</button>
    </div>
  </form>
)}
             
        
      </div>
  )
}

export default AdminCabins;