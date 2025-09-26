import { Booking } from "../models/Booking.js";
import { Cabin } from "../models/Cabin.js";
import { Op } from "sequelize";

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
        attributes: ["name"] ["urlImage"] // traer solo el nombre
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

  //validar que no sea una fecha pasada
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start < today || end < today) {
    return res.status(400).json({
      message: "No se puede reservar en fechas pasadas.",
    });
  }

  if (end < start) {
    return res.status(400).json({
      message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
    });
  }    

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
  const { startDate, endDate, totalPrice, userId, cabinId } = req.body;

  try {
    //validar que no sea una fecha pasada
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start < today || end < today) {
      return res.status(400).json({
        message: "No se puede reservar en fechas pasadas.",
      });
    }

    if (end < start) {
      return res.status(400).json({
        message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
      });
    }

    //validar fechas superpuestas
    const overlappingBooking = await Booking.findOne({
      where: {
        cabinId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            [Op.and]: [
              {
                startDate: { [Op.lte]: startDate },
              },
              {
                endDate: { [Op.gte]: endDate },
              },
            ],
          },
        ],
      },
    })
    if (overlappingBooking) {
      return res.status(409).json({
        message: "Ya existe una reserva para esa cabaña en las fechas seleccionadas."
      })
    }

    const newBooking = await Booking.create({
      startDate, endDate, totalPrice, userId, cabinId
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
