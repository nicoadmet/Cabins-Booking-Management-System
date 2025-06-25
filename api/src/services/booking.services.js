import { Booking } from "../models/Booking.js";
import { Cabin } from "../models/Cabin.js";

export const getAllBookings = async (req, res) => {
   const bookings = await Booking.findAll();
   if (!bookings) {
        return res.status(404).send({message: "No se encontraron reservas"});
   }
   res.json(bookings);
}

export const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { userId },
      include: {
        model: Cabin,
        attributes: ["name"] // traer solo el nombre
      }
    });
    res.json(bookings);
  } catch (error) {
    console.error("Error al obtener reservas del usuario:", error);
    res.status(500).json({ message: "Error al obtener reservas del usuario" });
  }
};

export const updateBooking = async (req, res) => {
    const { startDate, endDate } = req.body;
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).send({message: "Reserva no encontrada"});
    }
    await booking.update({
      startDate, endDate
    });

    res.json(booking);
}

export const createBooking = async (req, res) => {
  const { startDate, endDate, userId, cabinId } = req.body;

  try {
    const newBooking = await Booking.create({
      startDate, endDate, userId, cabinId
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    console.error(error);
    res.status(500).json({ message: "No se pudo crear la reserva" });
  }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
        return res.status(404).send({message: "Reserva no encontrada"});
    }
    await booking.destroy();
    res.send(`La Reserva con id ${id} ha sido eliminada correctamente`);
}
