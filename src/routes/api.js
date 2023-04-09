import { Router } from "express";
import {
  fetchPostJson,
  formatResponse,
  validatePostID,
} from "../utils/instagram";

const router = Router();

router.get("/", async (req, res, next) => {
  let tempID = req.query.id;
  let postID;

  try {
    postID = validatePostID(tempID);
  } catch (error) {
    return next(error);
  }

  try {
    const json = await fetchPostJson(postID);
    const response = formatResponse(postID, json);

    return res.send(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
