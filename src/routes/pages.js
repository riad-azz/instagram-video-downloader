import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/theme", (req, res) => {
  const theme = req.session.theme;
  return res.json({ theme: theme });
});

router.post("/theme/:name", (req, res) => {
  const themes = ["dark", "light"];
  const newTheme = req.params.name;
  console.log(newTheme);
  if (!themes.includes(newTheme.toLowerCase())) {
    const error = new Error(`Invalid theme ${newTheme}`);
    error.statusCode = 400;
    return next(error);
  }

  req.session.theme = newTheme;
  return res.json({ success: `Theme was saved to ${newTheme}` });
});

export default router;
