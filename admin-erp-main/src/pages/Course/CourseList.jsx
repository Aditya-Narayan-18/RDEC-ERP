import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import axios from "axios";
import { Modal, Button, Form, InputGroup, Pagination } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseList() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [searchByCourseName, setSearchByCourseName] = useState("");

  // Pagination states
  const [pageNo, setPageNo] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  const coursePerPage = 5;

  const totalPages = Math.ceil(totalCourses / coursePerPage);

  useEffect(() => {
    axios({
      url: "http://localhost:3000/courses",
      method: "get",
      params: {
        courseFullName: searchByCourseName,
        pageNo: pageNo,
        limit: coursePerPage,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log("Courses:", result.data.data);
          console.log("Total Courses:", result.data.totalCount);

          setCourses(result.data.data || []);

          setTotalCourses(result.data.totalCount || 0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNo, searchByCourseName, isDelete]);

  function searchCourse(courseName) {
    setSearchByCourseName(courseName);

    // Whenever search changes,
    // go back to first page
    setPageNo(1);
  }

  const handleClose = () => {
    setShow(false);
    setIsDelete(false);
  };

  function goToAddCoursePage() {
    navigate("/add/course");
  }

  function goToDelete(id) {
    axios({
      url: "http://localhost:3000/delete/course/" + id,
      method: "delete",
    })
      .then((result) => {
        if (result.data.success) {
          setShow(true);
          setIsDelete(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function goToEdit(id) {
    navigate("/edit/course/" + id);
  }

  function goToFirstPage() {
    setPageNo(1);
  }

  function goToPreviousPage() {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  }

  function goToNextPage() {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  }

  function goToLastPage() {
    setPageNo(totalPages);
  }

  return (
    <>
      <h3 className="text-center mb-4 py-2 text-primary fw-bold">
        LIST OF COURSES
      </h3>

      {/* Search */}
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>

        <Form.Control
          type="text"
          placeholder="Type Course Name to search"
          value={searchByCourseName}
          onChange={(e) => searchCourse(e.target.value)}
        />
      </InputGroup>

      {/* Add Course */}
      <button
        className="btn btn-success ms-3 mt-2 float-end"
        onClick={goToAddCoursePage}
      >
        Add Course +
      </button>

      {/* Course Table */}
      <table className="table text-center table-hover mt-5">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Course Short Name</th>
            <th>Intake</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td>{course.courseCode}</td>

                <td>{course.courseFullName}</td>

                <td>{course.courseShortName}</td>

                <td>{course.totalIntake}</td>

                <td>
                  <i
                    className="bi bi-pencil me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToEdit(course._id)}
                  ></i>

                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToDelete(course._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {/* First */}
            <Pagination.First onClick={goToFirstPage} disabled={pageNo === 1} />

            {/* Previous */}
            <Pagination.Prev
              onClick={goToPreviousPage}
              disabled={pageNo === 1}
            />

            {/* Page Numbers */}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Pagination.Item
                  key={page}
                  active={page === pageNo}
                  onClick={() => setPageNo(page)}
                >
                  {page}
                </Pagination.Item>
              ),
            )}

            {/* Next */}
            <Pagination.Next
              onClick={goToNextPage}
              disabled={pageNo === totalPages}
            />

            {/* Last */}
            <Pagination.Last
              onClick={goToLastPage}
              disabled={pageNo === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Page information */}

      {totalCourses > 0 && (
        <div className="text-center mt-2 text-muted">
          Showing page {pageNo} of {totalPages} ({totalCourses} courses)
        </div>
      )}

      {/* Delete Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>

        <Modal.Body>Course has been Deleted successfully 👍</Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseList;


// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import axios from 'axios'
// import { Modal, Button, Form, InputGroup, Container } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'

// function CourseList() {

//     let navigate = useNavigate();
//     let [courses, setCourses] = useState([])
//     const [show, setShow] = useState(false)
//     let [isDelete, setIsDelete] = useState(false)
//     let [searchByCourseName, setSearchByCourseName] = useState('')

//     useEffect(() => {

//         axios({
//             url: 'http://localhost:3000/courses',
//             method: 'get',
//             params: {
//                 courseFullName: searchByCourseName
//             }
//         }).then((result) => {
//             if (result.data.success) {
//                 console.log(result.data.data);
//                 setCourses(result.data.data);

//             }
//         }).catch((error) => {
//             console.log(error);

//         })
//     }, [isDelete, searchByCourseName])

//     function searchCourse(coursename) {
//         setSearchByCourseName(coursename)
//         axios({
//             // url: 'http://localhost:3000',
//             url: 'http://localhost:3000/course/search/' + coursename,
//             method: 'get',
//             params: {
//                 courseFullName: searchByCourseName
//             }

//         }).then((result) => {

//             if (result.data.success) {
//                 setCourses(result.data.data);
//                 // setCourses(result.data.data || []);
//             }

//         }).catch((error) => {
//             console.log(error);
//         })
//     }

//     const handleClose = () => {
//         setShow(false)
//         setIsDelete(true)
//     }

//     function goToAddCoursePage() {
//         navigate('/add/course')
//     }

//     function goToDelete(id) {
//         axios({
//             url: 'http://localhost:3000/delete/course/' + id,
//             method: 'delete'

//         }).then((result) => {
//             if (result.data.success) {
//                 setShow(true)
//             }
//         }).catch((err) => {
//             console.log(err.message);
//         })
//     }

//     function goToEdit(id) {
//         navigate('/edit/course/' + id);
//     }

//     return (
//         <>
//             <h3 className="text-center mb-4 py-2 text-primary fw-bold">LIST OF COURSES</h3>

//             <InputGroup className="mb-3">
//                 <InputGroup.Text>
//                     <i className="bi bi-search"></i>
//                 </InputGroup.Text>
//                 <Form.Control type="text" placeholder=" Type Course Name to search" onChange={(e) => searchCourse(e.target.value)} />
//             </InputGroup>

//             <button className="btn btn-success ms-3 mt-2 float-end" onClick={goToAddCoursePage}>Add Course +</button>

//             <table className="table text-center table-hover mt-5">
//                 <thead>
//                     <tr>
//                         <th>Course Code</th>
//                         <th>Course Name</th>
//                         <th>Course Short Name</th>
//                         <th>Intake</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         courses.map((course) =>
//                             <tr>
//                                 <td>{course.courseCode}</td>
//                                 <td>{course.courseFullName}</td>
//                                 <td>{course.courseShortName}</td>
//                                 <td>{course.totalIntake}</td>
//                                 <td>
//                                     <i className="bi bi-pencil me-3 " onClick={() => goToEdit(course._id)} ></i>
//                                     <i className="bi bi-trash" onClick={() => goToDelete(course._id)}></i>
//                                 </td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>

//             {/* ---------Modal code ------------- */}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Success</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Course has been Deleted successfully👍</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )

// }

// export default CourseList
