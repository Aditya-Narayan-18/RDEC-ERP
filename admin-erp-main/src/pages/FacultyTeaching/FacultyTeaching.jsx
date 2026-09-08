import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Modal, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FacultyTeaching() {
  const navigate = useNavigate();

  const [facultyTeachings, setfacultyTeachings] = useState([]);

  const [show, setShow] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const getFacultyTeaching = () => {
    axios({
      url: "http://localhost:3000/facultyTeaching",
      method: "get",
    })
      .then((result) => {
        if (result.data.success) {
          setfacultyTeachings(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFacultyTeaching();
  }, []);

  // ==========================================
  // EDIT
  // ==========================================

  const goToEdit = (id) => {
    navigate("/edit/facultyTeaching/" + id);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const goToDelete = (id) => {
    setSelectedId(id);

    setShow(true);
  };

  const confirmDelete = () => {
    axios({
      url: "http://localhost:3000/delete/facultyTeaching/" + selectedId,
      method: "delete",
    })
      .then((result) => {
        if (result.data.success) {
          setShow(false);

          getFacultyTeaching();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setShow(false);

    setSelectedId(null);
  };

  // ==========================================
  // FACULTY NAME
  // ==========================================

  const getFacultyName = (faculty) => {
    if (!faculty) {
      return "N/A";
    }

    return `${faculty.firstName || ""} ${faculty.lastName || ""}`.trim();
  };

  return (
    <Container fluid>
      <h3 className="text-center mb-4 py-2 text-primary fw-bold">FACULTY TEACHING</h3>

      <Button
        variant="success"
        className="float-end mb-3"
        onClick={() => navigate("/add/facultyTeaching")}
      >
        Add Faculty Teaching +
      </Button>

      <table className="table text-center table-hover mt-5">
        <thead>
          <tr>
            <th>Session</th>

            <th>Name</th>

            <th>Course</th>

            <th>Branch</th>

            <th>Section</th>

            <th>Sub.Code</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {facultyTeachings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No faculty teachings found.
              </td>
            </tr>
          ) : (
            facultyTeachings.map((facultyTeaching) => (
              <tr key={facultyTeaching._id}>
                <td>{facultyTeaching.day}</td>

                <td>
                  {facultyTeaching.startTime} - {facultyTeaching.endTime}
                </td>

                <td>{getFacultyName(facultyTeaching.faculty)}</td>

                <td>
                  {facultyTeaching.subject
                    ? `${facultyTeaching.subject.subjectCode} - ${facultyTeaching.subject.subjectFullName}`
                    : "N/A"}
                </td>

                <td>{facultyTeaching.session}</td>

                <td>{facultyTeaching.room}</td>

                <td>
                  <i
                    className="bi bi-pencil me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToEdit(facultyTeaching._id)}
                  ></i>

                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToDelete(facultyTeaching._id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* DELETE MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Faculty Teaching</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this faculty teaching?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default FacultyTeaching;
