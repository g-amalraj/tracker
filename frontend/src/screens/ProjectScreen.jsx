import React from 'react'
import AssignProject from "../components/Project"


const ProjectScreen = () => {



    return (
  
      <AssignProject />
  
    );
   };
  
  

export default ProjectScreen















// import React, { useState, useEffect } from "react";
// import SearchComponent from "./UserSearch";
// import UpdateProjectModal from "./UpdateProjectModal";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import { FiPlus } from "react-icons/fi";
// const ProjectScreen= () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [show, setShow] = useState(false);
//   const [activeModal, setActiveModal] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     project: "",
//     description:"",
//   });
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`/users`);
//       console.log(response)
//       const data = response.data;
//       setUsers(data);
//       const totalUsers = data.total;
//       const limit = data.limit;
//       setTotalPages(Math.ceil(totalUsers / limit));
//     } catch (error) { }
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage]);
//   const handlePreviousClick = () => {
//     setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
//   };
//   const handleNextClick = () => {
//     setCurrentPage((prevCurrentPage) =>
//       Math.min(prevCurrentPage + 1, totalPages)
//     );
//   };
//   const handleViewButton = async (userId) => {
//     try {
//       setActiveModal("update");
//       setCurrentUserId(userId);
//       const userData = await getSingleUser(userId);
//       setUserDetails(userData);
//       console.log("userdetails:,",userDetails);
//       setShow(true);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };
//   const getSingleUser = async (userId) => {
//     try {
//       const res = await axios.get(`/users/${userId}`);
//       return res.data.data;
//       console.log(res.data.data)
//     } catch (error) {
//       console.error("Error fetching single user:", error);
//       throw error; // Rethrow the error to be caught by the caller
//     }
//   };
//   const handleDeleteUser = async (userIdToDelete) => {
//     try {
//       const res = await axios.delete(`/users/${userIdToDelete}`);
//       if (res.status === 200) {
//         const updatedUsers = users.filter(user => user._id !== userIdToDelete);
//         setUsers(updatedUsers);
//       } else {
//         // Handle error if needed
//       }
//     } catch (error) {
//       // Handle error if needed
//     }
//   };
//   const handleSweetAlert = (userIdToDelete, index) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085D6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleDeleteUser(userIdToDelete);
//         Swal.fire({
//           title: 'Deleted!',
//           text: 'User has been deleted.',
//           icon: 'success'
//         });
//       }
//     });
//   return (
//     <div>
//       {users.map((user, index) => (
//         <div key={index}>
//           <span>{user.name}</span>
//           <button onClick={() => handleSweetAlert(index)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };
//   const handleRoleDropdown = (value, field) => {
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [field]: value,
//     }));
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };
//   const handleUpdateUser = async () => {
//     try {
//       await axios.put(`/users/${currentUserId}`, userDetails);
//       setShow(false);
//       fetchUsers();
//     } catch (error) { }
//   };
//   const handleAddUser = () => {
//     setActiveModal("add");
//     setShow(true);
//     setUserDetails({
//       name: "",
//       project: "",
//       description: "",
//     });
//   };
//   const handleCreateUser = async () => {
//     try {
//       await axios.post("/users/", userDetails);
//       setShow(false);
//       fetchUsers();
//     } catch (error) { }
//   };
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-center align-content-center mb-5">
//         <h1 className="d-flex text-black">Project</h1>
//       </div>
//       <div className="d-flex justify-start mb-4">
//       <button
//     onClick={handleAddUser}
//     className="btn flex gap-1"
//     style={{
//       backgroundColor: '#1A8754',
//       color: 'white',
//       border: 'none',
//       padding: '8px 16px', // Adjusted padding for larger size
//       borderRadius: '3px',
//       cursor: 'pointer',
//       whiteSpace: 'nowrap'
//     }}
//   >
//     <FiPlus /> Assign Project
//   </button>
//      </div>
//       {/* update user  */}
//       <UpdateProjectModal
//         show={show}
//         setShow={setShow}
//         handleInputChange={handleInputChange}
//         handleSubmit={
//           activeModal === "add" ? handleCreateUser : handleUpdateUser
//         }
//         title={activeModal === "add" ? <span style={{ color: "black" }}>Add project</span> : <span style={{ color: "black" }}>Add Project</span>}
//         okText={activeModal === "add" ? "Assign" : "Assign"}
//         userDetails={userDetails}
//         setUserDetails={setUserDetails}
//         handleRoleDropdown={handleRoleDropdown}
//       />
//       <SearchComponent handleSearchUser={getSingleUser} />
//       <div className="row text-black">
//         <div className="col-12">
//           <table className="table table-striped table-bordered text-black">
//             <thead>
//               <tr className="text-center">
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Project</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-black">
//   {users.map((user, index) => (
//     <tr key={user._id} className="flex py-0 text-center"  style={{ height: '20px' }}>
//       <td>{index + 1 + (currentPage - 1) * 10}</td>
//       <td>{user.name.toUpperCase()}</td>
//       <td>{user.project}</td>
//       <td className="d-flex text-center gap-2">
//       <div className="d-flex m-auto">
//       <button
//             className="py-1 mx-1 " // Remove Bootstrap classes
//             style={{
//               backgroundColor: '#1A8754', // Set button background color
//               color: 'white', // Set button text color
//               border: 'none', // Remove button border
//               padding: '5px 10px', // Adjust button padding
//               borderRadius: '3px', // Add border radius for button
//               cursor: 'pointer', // Add pointer cursor
//               whiteSpace: 'nowrap' // Prevent line breaks
//             }}
//             type="button"
//             onClick={() => handleViewButton(user._id)}
//           >
//             Add Details
//           </button>
//       <button
//             className="py-1 mx-1"
//             style={{
//               backgroundColor: '#FF0000',
//               color: 'white',
//               border: 'none',
//               padding: '5px 10px',
//               borderRadius: '3px',
//               cursor: 'pointer',
//               whiteSpace: 'nowrap'
//             }}
//             type="button"
//             onClick={() => handleSweetAlert(user._id, index)} // Pass user ID and index
//           >
//             Delete
//           </button>
//       </div>
//       </td>
//     </tr>
//   ))}
// </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="container mt-3">
//         <div className="d-flex justify-content-center align-items-center mt-3">
//           <span className="me-3">Total Pages: {totalPages}</span>{" "}
//           <button
//             className="btn btn-primary me-2" // Added gap between buttons using margin
//             onClick={handlePreviousClick}
//             disabled={currentPage <= 1}
//           >
//             Previous
//           </button>
//           {/* Next Button */}
//           <button
//             className="btn btn-primary"
//             onClick={handleNextClick}
//             disabled={currentPage >= totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProjectScreen;