const Course = require("../models/Course");

async function addCourse(req, res) {
  try {
    let course = new Course(req.body);

    await course.save();

    res.status(200).send({
      success: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error("AddCourse error:", error);

    if (error.code === 11000) {
      // duplicate courseCode
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getCourses(req, res) {
  try {
    // Pagination
    const pageNo = parseInt(req.query.pageNo) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (pageNo - 1) * limit;

    // Search
    const search = req.query.courseFullName || "";

    const filter = {
      courseFullName: {
        $regex: search,
        $options: "i",
      },
    };

    // Get courses for current page
    const courses = await Course.find(filter)
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);

    // Get total matching courses
    const totalCount = await Course.countDocuments(filter);

    res.status(200).send({
      success: true,
      data: courses,
      totalCount: totalCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong..!",
    });
  }
}

async function deleteCourse(req, res) {
  try {
    let courseId = req.params.id;

    const result = await Course.deleteOne({
      _id: courseId,
    });

    if (result.deletedCount > 0) {
      res.status(200).send({
        success: true,
        message: "Course Deleted Successfully...",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Can not Delete Course",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Can not Delete, Something went wrong..!",
    });
  }
}

async function getCourse(req, res) {
  try {
    let courseId = req.params.id;

    let course = await Course.findOne({
      _id: courseId,
    });

    res.status(200).send({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong...",
    });
  }
}

async function editCourse(req, res) {
  try {
    let courseId = req.params.id;

    console.log(courseId);
    console.log(req.body);

    let course = await Course.findOne({
      _id: courseId,
    });

    Object.assign(course, req.body);

    await course.save();

    console.log("Course has been updated Successfully.....");

    res.status(200).send({
      success: true,
      message: "Course has been updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong in updating Course.",
    });
  }
}

module.exports = {
  addCourse,
  getCourses,
  deleteCourse,
  getCourse,
  editCourse,
};
