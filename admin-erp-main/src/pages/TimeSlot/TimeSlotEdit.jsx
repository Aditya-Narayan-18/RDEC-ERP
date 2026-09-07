import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function TimeSlotEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [faculty, setFaculty] = useState("");
  const [subject, setSubject] = useState("");
  const [session, setSession] = useState("lecture");

  const [day, setDay] = useState("Monday");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [room, setRoom] = useState("");

  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // ==========================================
  // LOAD FACULTIES
  // ==========================================

  useEffect(() => {
    axios
      .get("http://localhost:3000/faculties")

      .then((result) => {
        if (result.data.success) {
          setFaculties(result.data.data);
        }
      })

      .catch((error) => {
        console.log(error);
      });

    // ==========================================
    // LOAD SUBJECTS
    // ==========================================

    axios
      .get("http://localhost:3000/subjects", {
        params: {
          subjectFullName: "",
        },
      })

      .then((result) => {
        if (result.data.success) {
          setSubjects(result.data.data);
        }
      })

      .catch((error) => {
        console.log(error);
      });

    // ==========================================
    // LOAD TIME SLOT
    // ==========================================

    axios
      .get("http://localhost:3000/timeSlot/" + id)

      .then((result) => {
        if (result.data.success) {
          const data = result.data.data;

          setFaculty(data.faculty?._id || data.faculty || "");

          setSubject(data.subject?._id || data.subject || "");

          setSession(data.session || "lecture");

          setDay(data.day || "Monday");

          setStartTime(data.startTime || "");

          setEndTime(data.endTime || "");

          setRoom(data.room || "");
        }

        setLoading(false);
      })

      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [id]);

  // ==========================================
  // UPDATE
  // ==========================================

  const updateTimeSlot = (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    axios({
      url: "http://localhost:3000/edit/timeSlot/" + id,

      method: "put",

      data: {
        faculty,
        subject,
        session,
        day,
        startTime,
        endTime,
        room,
      },
    })
      .then((result) => {
        if (result.data.success) {
          alert("Time slot updated successfully");

          navigate("/timeSlots");
        }

        setButtonDisabled(false);
      })

      .catch((error) => {
        console.log(error);

        setButtonDisabled(false);

        alert("Something went wrong while updating time slot");
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4 py-2 text-primary fw-bold">
        EDIT TIME SLOT
      </h3>

      <hr />

      <Form onSubmit={updateTimeSlot}>
        {/* FACULTY + SUBJECT */}

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>

              <Form.Select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
              >
                <option value="">Select Faculty</option>

                {faculties.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.firstName} {item.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>

              <Form.Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>

                {subjects.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.subjectCode} - {item.subjectFullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* SESSION + DAY */}

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Session</Form.Label>

              <Form.Select
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option value="lecture">Lecture</option>

                <option value="practical">Practical</option>

                <option value="tutorial">Tutorial</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Day</Form.Label>

              <Form.Select value={day} onChange={(e) => setDay(e.target.value)}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* TIME */}

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>

              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>

              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* ROOM */}

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>

              <Form.Control
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/timeSlots")}
          >
            Cancel
          </Button>

          <Button variant="primary" type="submit" disabled={buttonDisabled}>
            Update Time Slot
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default TimeSlotEdit;
