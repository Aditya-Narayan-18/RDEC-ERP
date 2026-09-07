const TimeSlot = require("../models/TimeSlot");

// ===============================
// ADD TIME SLOT
// ===============================

async function addTimeSlot(req, res) {
  try {
    const timeSlot = new TimeSlot(req.body);

    await timeSlot.save();

    res.status(200).send({
      success: true,
      message: "Time slot added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong while adding time slot",
    });
  }
}

// ===============================
// GET ALL TIME SLOTS
// ===============================

async function getTimeSlots(req, res) {
  try {
    const timeSlots = await TimeSlot.find()
      .populate("faculty")
      .populate("subject")
      .sort({
        day: 1,
        startTime: 1,
      });

    res.status(200).send({
      success: true,
      data: timeSlots,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching time slots",
    });
  }
}

// ===============================
// GET SINGLE TIME SLOT
// ===============================

async function getTimeSlot(req, res) {
  try {
    const timeSlot = await TimeSlot.findOne({
      _id: req.params.id,
    })
      .populate("faculty")
      .populate("subject");

    if (!timeSlot) {
      return res.status(404).send({
        success: false,
        message: "Time slot not found",
      });
    }

    res.status(200).send({
      success: true,
      data: timeSlot,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
}

// ===============================
// EDIT TIME SLOT
// ===============================

async function editTimeSlot(req, res) {
  try {
    const timeSlot = await TimeSlot.findOne({
      _id: req.params.id,
    });

    if (!timeSlot) {
      return res.status(404).send({
        success: false,
        message: "Time slot not found",
      });
    }

    Object.assign(timeSlot, req.body);

    await timeSlot.save();

    res.status(200).send({
      success: true,
      message: "Time slot updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong while updating time slot",
    });
  }
}

// ===============================
// DELETE TIME SLOT
// ===============================

async function deleteTimeSlot(req, res) {
  try {
    const timeSlot = await TimeSlot.findOne({
      _id: req.params.id,
    });

    if (!timeSlot) {
      return res.status(404).send({
        success: false,
        message: "Time slot not found",
      });
    }

    await TimeSlot.deleteOne({
      _id: req.params.id,
    });

    res.status(200).send({
      success: true,
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting time slot",
    });
  }
}

module.exports = {
  addTimeSlot,
  getTimeSlots,
  getTimeSlot,
  editTimeSlot,
  deleteTimeSlot,
};
