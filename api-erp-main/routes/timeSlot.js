const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const TimeSlotController = require("../controllers/TimeSlotController");

router.use(bodyParser.json());

router.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// ADD
router.post("/add/timeSlot", (req, res) => {
  TimeSlotController.addTimeSlot(req, res);
});

// GET ALL
router.get("/timeSlots", (req, res) => {
  TimeSlotController.getTimeSlots(req, res);
});

// GET ONE
router.get("/timeSlot/:id", (req, res) => {
  TimeSlotController.getTimeSlot(req, res);
});

// EDIT
router.put("/edit/timeSlot/:id", (req, res) => {
  TimeSlotController.editTimeSlot(req, res);
});

// DELETE
router.delete("/delete/timeSlot/:id", (req, res) => {
  TimeSlotController.deleteTimeSlot(req, res);
});

module.exports = router;
