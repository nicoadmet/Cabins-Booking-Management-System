import { Cabin } from "../models/Cabin.js";

export const getAllCabins = async (req, res) => {
   const cabins = await Cabin.findAll();
   if (!cabins) {
        return res.status(404).send({message: "No se encontraron cabañas"});
   }
   res.json(cabins);
}

export const getCabinById = async (req, res) => {
  const { id } = req.params;
  const cabin = await Cabin.findByPk(id);
  if (!cabin) {
      return res.status(404).send({message: "Cabaña no encontrada"});
  }
  res.json(cabin);
}

export const updateCabin = async (req, res) => {
    const { name, description, pricePerNight, capacity, isAvailable, imageUrl } = req.body;
    const { id } = req.params;
    const cabin = await Cabin.findByPk(id);
    if (!cabin) {
        return res.status(404).send({message: "Cabaña no encontrada"});
    }
    await cabin.update({
        name, description, pricePerNight, capacity, isAvailable, imageUrl
    });

    res.json(cabin);
}

export const createCabin = async (req, res) => {
  const { name, description, pricePerNight, capacity, isAvailable, imageUrl } = req.body;

  try {
    const newCabin = await Cabin.create({
      name,
      description,
      pricePerNight,
      capacity,
      isAvailable,
      imageUrl
    });

    res.status(201).json(newCabin);
  } catch (error) {
    console.error("Error al crear cabaña:", error);
    res.status(500).json({ message: "No se pudo crear la cabaña" });
  }
};

export const deleteCabin = async (req, res) => {
    const { id } = req.params;
    const cabin = await Cabin.findByPk(id);
    if (!cabin) {
        return res.status(404).send({message: "Cabaña no encontrada"});
    }
    await cabin.destroy();
    res.send(`La cabaña con id ${id} ha sido eliminada correctamente`);
}






