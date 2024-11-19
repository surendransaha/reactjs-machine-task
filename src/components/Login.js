import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { 
  Button, Container, Row, Col, Card, CardBody, CardText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
 } from "reactstrap";
 import { useDispatch, useSelector } from 'react-redux';
 import { loginRequest } from '../actions/authActions';
 import { useNavigate } from 'react-router-dom';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password, rememberMe });
    dispatch(loginRequest(email,password));
  };

  useEffect(() => {
    if (token) {
      toast.success("Successfully logged In!", {
        position: "top-center"
      });
      setTimeout(() => {
        navigate('/home');
      }, 3000);
      
    }
  }, [token, navigate]);

  return (
    <div>
       <Container>
      <Row className="justify-content-center" style={{marginTop:"100px"}}>
        <Col md="6" className="mt-5" style={{
          background: "#ebeaea", padding: "46px"
        }}>

          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{' '}
                Remember me
              </Label>
            </FormGroup>

            <br/>

            <Button color="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

    <ToastContainer />
    </div>
  );
}

export default LoginPage;
