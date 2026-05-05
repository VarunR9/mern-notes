import express from "express"
import { CreateNode, deleteNode, getAllNotes, updateNode, getNotebyid } from "../controllers/notesControllers.js";

const router=express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNotebyid);
router.post("/",CreateNode);
router.put("/:id",updateNode);
router.delete("/:id",deleteNode);

export default router;