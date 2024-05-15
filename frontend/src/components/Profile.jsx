import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
} from 'mdb-react-ui-kit';
import axios from 'axios'; 

const ProfileCard = () => {
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
        const response = await axios.get(`/users/${userId}`);
        const userData= response.data.data;
        setUserData(userData); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); 
  }, []);

  return (
    <section style={{ backgroundColor: '#eee', height: 'calc(100vh - 100px)' }}>
      {userData && (
        <MDBRow>
          <MDBCol lg="4" className="mb-4">
            {/* Left section (profile image) */}
            <MDBCard>
              <MDBCardBody className="text-center">
                <img
                  src={userData.profileImageUrl} // Assuming user profile image URL is available in userData
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '250px',height:"250px", cursor: 'pointer' }}
                />
                <p className="text-muted mb-1">{userData.role}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8" className="mb-4 d-flex justify-content-center">
            {/* Right section (profile details) */}
            <MDBCard className="w-100">
              <MDBCardBody>
               <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Manager</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.manager}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </section>
  );
};

export default ProfileCard;

