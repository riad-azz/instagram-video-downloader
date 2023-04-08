import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/theme/:name", (req, res) => {
  const themes = ["dark", "light"];
  const newTheme = req.params.name;

  if (!themes.includes(newTheme.toLowerCase())) {
    const error = new Error(`Invalid theme ${newTheme}`);
    error.statusCode = 400;
    return next(error);
  }

  res.cookie("theme", newTheme, { maxAge: 900000, httpOnly: false });
  return res.json({ success: `Theme was saved to ${newTheme}` });
});

export default router;
