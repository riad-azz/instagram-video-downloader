import { Router } from "express";
import { fetchPostJson, formatResponse } from "../utils/insta-utils";

const router = Router();

router.get("/", async (req, res, next) => {
  let postID = req.query.id;
  if (!postID) {
    const error = new Error("Please provide an instagram post ID");
    error.statusCode = 400;
    return next(error);
  }

  if (postID.length > 255) {
    const error = new Error("Invalid instagram post ID");
    error.statusCode = 400;
    return next(error);
  }

  if (postID.includes("instagram.com")) {
    const idIndex = postID.includes("https://") ? 4 : 2;
    const tempID = postID.split("/").at(idIndex);
    if (!tempID) {
      const error = new Error("Could not find post ID in the url");
      error.statusCode = 400;
      return next(error);
    }

    postID = tempID;
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
