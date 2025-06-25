import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Cabin } from "./Cabin.js";

export const Booking = sequelize.define("booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, { timestamps: false });

// relaciones
User.hasMany(Booking, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Booking.belongsTo(User, { foreignKey: "userId" });

Cabin.hasMany(Booking, {
  foreignKey: "cabinId",
  onDelete: "CASCADE",
});
Booking.belongsTo(Cabin, { foreignKey: "cabinId" });