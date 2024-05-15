import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { FiPlus } from "react-icons/fi";
import { Container, Row, Col } from 'react-bootstrap'
import { Redirect } from "react-router-dom";

const AssignProject = () => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [users, setUsers] = useState([]);
    const [projects, setprojects] = useState([]);
    const  userInfo  = useSelector((state) => state.auth);
   
    //const id = userInfo._id;
    const [showForm, setShowForm] = useState(false);
    const [showProject, setShowProject]= useState(false);
   
useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/');
                const users = response.data;
                 //console.log(users)
                setUsers(users);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []); 

    
    const handleUpdateProject= async (projectId, users) =>{

     
          try {
            const response = await axios.put(`/projects/update/${projectId}`, { users: selectedUsers});
            
         
            console.log('Updated project:', response.data);
            const view = await fetchprojects();
            console.log(view)
      
          } catch (error) {
            console.log('Error updating project:', error);
             
          }
        };
     
    
  const handleDeleteProject = async (project_id) => {
    try {
      console.log(project_id)
      const projectId = project_id;
      const res = await axios.delete(`/projects/${projectId}`);
      if (res.status === 200) {
        const deletedProject = projects.filter(project => project._id !== projectId);
        setprojects( deletedProject);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  
  const handleUserChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedUsers([...selectedUsers, value]);
        } else {
            setSelectedUsers(selectedUsers.filter((user) => user !== value));
        }
    };
  console.log(selectedUsers)

  const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    
 
  const handleSubmit = async (event) => {
      event.preventDefault();
      
     // {Assign? !showForm:showProject}
      try {
        
        const response = await axios.post('/projects/create', {
          users: selectedUsers, 
          projectName: selectedProject
        });
        console.log('Project created successfully:', response.data);
        // Only call fetchprojects if the request was successful
       
        if (response.status === 201){
          fetchprojects(); 
          
        }
        setShowProject(!showProject);
      } catch (error) {
        console.log(error.message);
      }
    };
    

  const fetchprojects = async () => {
      try {
          const response = await axios.get('/projects/');
          const projects = response.data;
          //console.log(projects)
          setprojects(projects);
        
      } catch (error) {
          console.error('Error fetching projects:', error);
      }
  };



  const handleProjectTo = async() => {
        setShowForm(!showForm);
    }



    //
  

  return (
    <>
       
      <Container>
          
            <div className="container mt-4">
              <div className="d-flex justify-content-center align-content-center mb-5">
                <h1 className="d-flex text-black">Projects</h1>
              </div>
              <div className='d-flex justify-start mb-4'>
              
      <button onClick={handleProjectTo}
        className="btn flex gap-1 "
        style={{
          backgroundColor: '#1A8754',
          color: 'white',
          border: 'none',
          width:"15rem",
          padding: '8px 16px', // Adjusted padding for larger size
          borderRadius: '3px',
          cursor: 'pointer',
          whiteSpace: 'nowrap'}}>Assign Projects</button>
    </div>
            </div>
         

          {showForm ? (
            <Row>
              <Col>
                <div class="card w-25">
                  <div class="card-body ">
                    {/* <h5 class="card-title">Assign </h5> */}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formProject">
                        <Form.Label>ProjectName:</Form.Label>
                        <Form.Control as="select" onChange={handleProjectChange}>
                          <option value="Tracker">Tracker</option>
                          <option value="Mess Manager">Mess Manager</option>
                          <option value="Attendance">Attendance</option>
                          <option value="vetran outreach Admin">VorA</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formUsers">
                        <Form.Label>Users:</Form.Label>
                        {users && users.map((user) => (
                          <Form.Check
                            key={ user._id }
                            type="checkbox"
                            label={ user.name }
                            value={ user.name }
                            onChange={handleUserChange}
                            checked={selectedUsers.includes( user.name )}
                          />
                        ))}
                      </Form.Group>

                      <Button type="submit" variant="primary">Assign</Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (" ")}
           </Container> 
      {showProject ? (

            <div className="row text-black">
              <div className="col-12">
                <table className="table table-striped table-bordered text-black">
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>projectName</th>
                      <th>users</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {projects.map((project, index) => (
                      <tr key={project._id} className="flex py-0 text-center"  style={{ height: '15px' }}>
                        <td>{index + 1 }</td>
                        <td>{project.projectName}</td>
                        <td>{project.users}</td>
                        <td className="d-flex text-center gap-2"></td>
                        <button
            className="py-1 mx-1 " 
            style={{
              backgroundColor: '#1A8754',
              color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              borderRadius: '3px', 
              cursor: 'pointer',
              whiteSpace: 'nowrap' 
            }}
            type="button"
            onClick={() => handleUpdateProject ( project._id, users)}
          >
            update
          </button>
      <button
            className="py-1 mx-1"
            style={{
              backgroundColor: '#FF0000',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            type="button"
            onClick={() => handleDeleteProject(project._id)} // Pass user ID and index
          >
            Delete
          </button>
    
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ):(" ")}
       
    </>
);

  
}
export default AssignProject


