import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Modal, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TimeSlotList() {
  const navigate = useNavigate();

  const [timeSlots, setTimeSlots] = useState([]);

  const [show, setShow] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  // ==========================================
  // GET TIME SLOTS
  // ==========================================

  const getTimeSlots = () => {
    axios({
      url: "http://localhost:3000/timeSlots",
      method: "get",
    })
      .then((result) => {
        if (result.data.success) {
          setTimeSlots(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTimeSlots();
  }, []);

  // ==========================================
  // EDIT
  // ==========================================

  const goToEdit = (id) => {
    navigate("/edit/timeSlot/" + id);
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
      url: "http://localhost:3000/delete/timeSlot/" + selectedId,
      method: "delete",
    })
      .then((result) => {
        if (result.data.success) {
          setShow(false);

          getTimeSlots();
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
      <h3 className="text-center mb-4 py-2 text-primary fw-bold">TIME SLOTS</h3>

      <Button
        variant="success"
        className="float-end mb-3"
        onClick={() => navigate("/add/timeSlot")}
      >
        Add Time Slot +
      </Button>

      <table className="table text-center table-hover mt-5">
        <thead>
          <tr>
            <th>Day</th>

            <th>Time</th>

            <th>Faculty</th>

            <th>Subject</th>

            <th>Session</th>

            <th>Room</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {timeSlots.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No time slots found.
              </td>
            </tr>
          ) : (
            timeSlots.map((timeSlot) => (
              <tr key={timeSlot._id}>
                <td>{timeSlot.day}</td>

                <td>
                  {timeSlot.startTime} - {timeSlot.endTime}
                </td>

                <td>{getFacultyName(timeSlot.faculty)}</td>

                <td>
                  {timeSlot.subject
                    ? `${timeSlot.subject.subjectCode} - ${timeSlot.subject.subjectFullName}`
                    : "N/A"}
                </td>

                <td>{timeSlot.session}</td>

                <td>{timeSlot.room}</td>

                <td>
                  <i
                    className="bi bi-pencil me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToEdit(timeSlot._id)}
                  ></i>

                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToDelete(timeSlot._id)}
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
          <Modal.Title>Delete Time Slot</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this time slot?</Modal.Body>

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

export default TimeSlotList;
