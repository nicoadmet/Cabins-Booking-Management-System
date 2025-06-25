import { Router } from "express";
import { getAllUsers, updateUser, deleteUser } from "../services/user.services.js"

const router = Router();

router.get("/", getAllUsers);


router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;