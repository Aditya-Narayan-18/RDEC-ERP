import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import axios from "axios";

import { Modal, Button, Form, Pagination, InputGroup } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function BranchList() {
  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [branches, setBranches] = useState([]);

  const [show, setShow] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const [searchByBranchName, setSearchByBranchName] = useState("");

  const [nop, setNop] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [totalBranches, setTotalBranches] = useState(0);

  // Number of branches per page

  const branchPerPage = 5;

  // ==========================================
  // GET BRANCHES
  // ==========================================

  useEffect(() => {
    axios({
      url: "http://localhost:3000/branches",

      method: "get",

      params: {
        branchFullName: searchByBranchName,

        pageNo: pageNo,

        limit: branchPerPage,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.data);

          setBranches(result.data.data);

          setTotalBranches(result.data.totalCount);

          setNop(Math.ceil(result.data.totalCount / branchPerPage));
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, [isDelete, searchByBranchName, pageNo]);

  // ==========================================
  // SEARCH
  // ==========================================

  function searchBranch(branchname) {
    setSearchByBranchName(branchname);

    // Always go back to first page
    // when a new search is performed

    setPageNo(1);
  }

  // ==========================================
  // PAGINATION ITEMS
  // ==========================================

  let items = [];

  for (let i = 1; i <= nop; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === pageNo}
        onClick={() => setPageNo(i)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  // ==========================================
  // ADD BRANCH
  // ==========================================

  function goToAddBranchPage() {
    navigate("/add/branch");
  }

  // ==========================================
  // EDIT BRANCH
  // ==========================================

  function goToEdit(id) {
    navigate("/edit/branch/" + id);
  }

  // ==========================================
  // DELETE BRANCH
  // ==========================================

  function goToDelete(id) {
    axios({
      url: "http://localhost:3000/delete/branch/" + id,

      method: "delete",
    })
      .then((result) => {
        if (result.data.success) {
          setShow(true);

          // Trigger useEffect again
          setIsDelete((prev) => !prev);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {/* ==================================
                PAGE TITLE
            ================================== */}

      <h3 className="text-center mb-4 py-2 text-primary fw-bold">
        LIST OF BRANCHES
      </h3>

      {/* ==================================
                SEARCH
            ================================== */}

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>

        <Form.Control
          type="text"
          placeholder="Type Branch Name to search"
          value={searchByBranchName}
          onChange={(e) => searchBranch(e.target.value)}
        />
      </InputGroup>

      {/* ==================================
                ADD BUTTON
            ================================== */}

      <button
        className="btn btn-success ms-3 mt-2 float-end"
        onClick={goToAddBranchPage}
      >
        Add Branch +
      </button>

      {/* ==================================
                TABLE
            ================================== */}

      <table className="table text-center table-hover mt-5">
        <thead>
          <tr>
            <th>Branch Code</th>

            <th>Branch Name</th>

            <th>Branch Short Name</th>

            <th>Intake</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {branches.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No branches found
              </td>
            </tr>
          ) : (
            branches.map((branch) => (
              <tr key={branch._id}>
                <td>{branch.branchCode}</td>

                <td>{branch.branchFullName}</td>

                <td>{branch.branchShortName}</td>

                <td>{branch.branchIntake}</td>

                <td>
                  <i
                    className="bi bi-pencil me-3"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => goToEdit(branch._id)}
                  ></i>

                  <i
                    className="bi bi-trash"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => goToDelete(branch._id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ==================================
                PAGINATION
            ================================== */}

      {totalBranches > branchPerPage && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First
              disabled={pageNo === 1}
              onClick={() => setPageNo(1)}
            />

            <Pagination.Prev
              disabled={pageNo === 1}
              onClick={() => setPageNo((prev) => prev - 1)}
            />

            {items}

            <Pagination.Next
              disabled={pageNo === nop}
              onClick={() => setPageNo((prev) => prev + 1)}
            />

            <Pagination.Last
              disabled={pageNo === nop}
              onClick={() => setPageNo(nop)}
            />
          </Pagination>
        </div>
      )}

      {/* ==================================
                DELETE MODAL
            ================================== */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>

        <Modal.Body>Branch has been deleted successfully 👍</Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BranchList;

// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import axios from 'axios'
// import { Modal, Button, Form, Pagination, InputGroup, Container } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'

// function BranchList() {

//     let navigate = useNavigate();
//     let [branches, setBranches] = useState([])
//     const [show, setShow] = useState(false)
//     let [isDelete, setIsDelete] = useState(false)
//     let [searchByBranchName, setSearchByBranchName] = useState('')
//     let [nop, setNop] = useState(1);
//     let [pageNo, setPageNo] = useState(1);
//     let [totalBranches, setTotalBranches] = useState(0);
//     let branchPerPage = 5;
//     let items = [];
//     for (let i = 1; i <= nop; i++) {
//         items.push(
//             <Pagination.Item key={i} onClick={() => setPageNo(i)} >{i}</Pagination.Item>
//         )
//     }

//     useEffect(() => {

//         axios({
//             url: 'http://localhost:3000/branches',
//             method: 'get',
//             params: {
//                 branchFullName: searchByBranchName,
//                 pageNo: pageNo,
//                 limit: branchPerPage
//             }
//         }).then((result) => {
//             if (result.data.success) {
//                 console.log(result.data.data);
//                 setBranches(result.data.data);
//                 setTotalBranches(result.data.totalCount)
//                 setNop(Math.ceil(result.data.totalCount / branchPerPage))

//             }
//         }).catch((error) => {
//             console.log(error);

//         })
//     }, [isDelete, searchByBranchName, pageNo])

//     function searchBranch(branchname) {
//         setSearchByBranchName(branchname)
//         axios({
//             url: 'http://localhost:3000/branch/search/' + branchname,
//             method: 'get',
//             params: {
//                 branchFullName: setSearchByBranchName
//             }
//         }).then((result) => {
//             if (result.data.success) {
//                 setBranches(result.data.data);
//             }
//         }).catch((error) => {
//             console.log(error);
//         })
//     }

//     const handleClose = () => {
//         setShow(false)
//         setIsDelete(true)
//     }

//     function goToAddBranchPage() {
//         navigate('/add/branch')
//     }

//     function goToDelete(id) {
//         axios({
//             url: 'http://localhost:3000/delete/branch/' + id,
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
//         // navigate('/edit/branch/' + id);
//     }

//     return (
//         <>
//             <h3 className="text-center mb-4 py-2 text-primary fw-bold">LIST OF BRANCHES</h3>

//             <InputGroup className="mb-3">
//                 <InputGroup.Text>
//                     <i className="bi bi-search"></i>
//                 </InputGroup.Text>
//                 <Form.Control type="text" placeholder=" Type Branch Name to search" onChange={(e) => searchBranch(e.target.value)} />
//             </InputGroup>

//             <button className="btn btn-success ms-3 mt-2 float-end" onClick={goToAddBranchPage}>Add Branch +</button>

//             <table className="table text-center table-hover mt-5">
//                 <thead>
//                     <tr>
//                         <th>Branch Code</th>
//                         <th>Branch Name</th>
//                         <th>Branch Short Name</th>
//                         <th>Intake</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         branches.map((branch) =>
//                             <tr>
//                                 <td>{branch.branchCode}</td>
//                                 <td>{branch.branchFullName}</td>
//                                 <td>{branch.branchShortName}</td>
//                                 <td>{branch.branchIntake}</td>
//                                 <td>
//                                     <i className="bi bi-pencil me-3 " onClick={() => goToEdit(branch._id)} ></i>
//                                     <i className="bi bi-trash" onClick={() => goToDelete(branch._id)}></i>
//                                 </td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>

//             <div className="d-flex justify-content-center">
//                 {
//                     totalBranches > branchPerPage ?
//                         <Pagination>{items}</Pagination> : ''
//                 }
//             </div>

//             {/* ---------Modal code ------------- */}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Success</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Branch has been Deleted successfully👍</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }

// export default BranchList
