const express = require("express")
const tripController = require("../controllers/trip.controller");

const tripRouter = express.Router();
// user endpoints
tripRouter.get("/", tripController.getBusList);
tripRouter.post("/booking", tripController.bookTicket);

module.exports = tripRouter

// todo: admin endpoints 