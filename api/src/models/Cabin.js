import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Cabin = sequelize.define("cabin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    pricePerNight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: false });