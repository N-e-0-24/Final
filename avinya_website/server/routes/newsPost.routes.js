// routes/blogPosts.routes.js
import express from "express";

import { getAllNews,addNews,getSingleNews,updateNews,removeNews} from '../controllers/newsPost.controller.js'

const router = express.Router();

router.get("/api/news",getAllNews);
router.post("/api/news",addNews);
router.get("/:id", getSingleNews);
router.patch("/:id",updateNews);
router.delete("/:id", removeNews);



export default router;