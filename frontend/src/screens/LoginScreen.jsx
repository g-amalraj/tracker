
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  setCredentials,
} from "../features/checkInOut/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const isAdmin = useSelector(state => state.auth.userInfo?.isAdmin);
  useEffect(() => {
    console.log("hi", isAuthenticated, userInfo?.isAdmin);

    if (isAuthenticated && userInfo?.isAdmin === true) {
      console.log("admin");
      navigate("/project");
    } //else{
    //   navigate("/dashboard"); 
    // } 
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
       
        localStorage.setItem("user", JSON.stringify(data));
        //console.log(data)
        dispatch(setCredentials({ ...data }));
        dispatch(setAuthenticated(true));
        
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto" }} className="py-5">
      <FormContainer>
        <Card className="p-3 px-5">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/image/login.jpg"
              alt="Login"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <h1 className="text-center mb-1" style={{ color: "black" }}>
            Sign In
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label style={{ color: "black" }}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              style={{ float: "right" }}
            >
              Sign In
            </Button>
          </Form>
        </Card>
      </FormContainer>
    </div>
  );
};
export default LoginScreen;
