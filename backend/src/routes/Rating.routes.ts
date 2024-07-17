import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { CreateRatingSchema, RatingIdsSchema } from "../utils/schema/rating.schema";
import { RatingController } from "../controllers/Rating.controller";
import { RatingService } from "../services/Rating.service";
import { RatingRepository } from "../repositories/Rating.repository";
import { authValidatePassport } from "../middlewares/authValidate";

const ratingRepository = new RatingRepository();
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);

const routerRating = Router()

routerRating.param("ratingId",middlewareParamsObjectId("ratingId"));
routerRating.param("userId",middlewareParamsObjectId("userId"));

routerRating.get("/rating", ratingController.find); //Admin
routerRating.get("/rating/user/:userId",  ratingController.findByUserId); //Admin
routerRating.get("/rating/featured", ratingController.findFeaturedRatings);
routerRating.get("/rating/:ratingId",  ratingController.findById); //Admin

routerRating.post("/rating", middlewareBody(CreateRatingSchema), authValidatePassport, ratingController.create); //Login required

routerRating.put("/rating", authValidatePassport, ratingController.updateComment); //Login required
routerRating.put("/rating/featured", middlewareBody(RatingIdsSchema), ratingController.updateFeaturedRatings); //Admin -body Schema

routerRating.delete("/rating/user/:userId", ratingController.deleteByUserId); //Admin
routerRating.delete("/rating/:ratingId", ratingController.deleteById); //Admin

export default routerRating;