import { Router } from "express";
import { getAllCabins, getCabinById, updateCabin, deleteCabin, createCabin } from "../services/cabin.services.js"

const router = Router();

router.get("/", getAllCabins);

router.get("/:id", getCabinById);

router.post("/", createCabin);

router.put("/:id", updateCabin);

router.delete("/:id", deleteCabin);

export default router;