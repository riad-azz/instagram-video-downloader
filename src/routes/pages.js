import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  return res.render("index");
});

export default router;
