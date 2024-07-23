import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import {
  CreateRatingSchema,
  RatingIdsSchema,
} from "../utils/schema/rating.schema";
import { RatingController } from "../controllers/Rating.controller";
import { RatingService } from "../services/Rating.service";
import { RatingRepository } from "../repositories/Rating.repository";
import {
  authValidatePassport,
  authValidateAdmin,
} from "../middlewares/authValidate";

const ratingRepository = new RatingRepository();
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);

const routerRating = Router();

routerRating.param("ratingId", middlewareParamsObjectId("ratingId"));
routerRating.param("userId", middlewareParamsObjectId("userId"));

routerRating.get("/rating", authValidateAdmin, ratingController.find);

routerRating.get(
  "/rating/user/:userId",
  authValidatePassport,
  authValidateAdmin,
  ratingController.findByUserId
);

routerRating.get("/rating/featured", ratingController.findFeaturedRatings);

routerRating.get(
  "/rating/:ratingId",
  authValidatePassport,
  authValidateAdmin,
  ratingController.findById
);

routerRating.post(
  "/rating",
  authValidatePassport,
  middlewareBody(CreateRatingSchema),
  ratingController.create
);

routerRating.put(
  "/rating",
  authValidatePassport,
  ratingController.updateComment
);
routerRating.put(
  "/rating/featured",
  authValidatePassport,
  authValidateAdmin,
  middlewareBody(RatingIdsSchema),
  ratingController.updateFeaturedRatings
);

routerRating.delete(
  "/rating/user/:userId",
  authValidatePassport,
  authValidateAdmin,
  ratingController.deleteByUserId
);
routerRating.delete(
  "/rating/:ratingId",
  authValidatePassport,
  authValidateAdmin,
  ratingController.deleteById
);

export default routerRating;
