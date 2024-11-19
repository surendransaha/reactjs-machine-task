import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { Container, Row, Col, Button, Input, Table, Card, CardBody, CardTitle, CardText, Pagination, PaginationItem, PaginationLink, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from "reactstrap";
import { BsPower, BsTable, BsCardList  } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequest } from '../actions/authActions';
import { fetchUsersRequest, deleteUserRequest, updateUserRequest } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  avatar: Yup.string().url("Invalid URL format").required("Avatar URL is required")
});

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user);
  const tokenLocal = localStorage.getItem('token');

  const usersList = useSelector((state) => state.users.users);

  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredID, setIsHoveredID] = useState(0);



  const [modalOpen, setModalOpen] = useState(false); 
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });

  const [editingUser, setEditingUser] = useState(null); 
const [modalOpenEdit, setModalOpenEdit] = useState(false); 


const handleEditUser = (user) => {
  setEditingUser(user);
  setModalOpenEdit(true);
};

const handleUpdateUser = (updatedUser) => {
  console.log("updatedUserupdatedUser", updatedUser)
  dispatch(updateUserRequest(updatedUser, usersList));  // Dispatch action to update user
  toast.success('User updated successfully!', { position: 'top-center' });
};




  const filteredUsers = usersList.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsersCard = usersList.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);


  const handleLogout = () => {
    dispatch(logOutRequest());


      toast.success("Successfully logged Out!", {
        position: "top-center"
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);
      

  };

  const handleCreateUser = (values) => {
    usersList.push(values)
    setModalOpen(false);
    toast.success('User created successfully!', { position: 'top-center' });
  };

  const handleDeleteUser = (values) => {

    dispatch(deleteUserRequest(values, usersList));
    toast.success('User removed successfully!', { position: 'top-center' });
  };


  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);




  return (
    <div style={{background: "#ededed", height: "1556px"}}>
      <header className="footer bg-dark">
      <Container>
          <Row>
            <Col className="text-end">
            <p className='home-top-navbar-text'>Elan Musk 
            <Button color="danger" onClick={handleLogout} className='home-top-navbar-logout-button'> <BsPower /> </Button>
            </p>
              
            </Col>
          </Row>
        </Container>
      </header>


      <Container className="doTo-heading-bottom">
        <Row xs="1">
          <Col className="border">
<br/>

  <Row>

    <Col sm="8">
    <h2 className="my-2">Users</h2>
    </Col>
    
    <Col sm="4">
    <span className="d-flex" style={{float:'right'}}>

    <Input
         type="text"
         placeholder="Search"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         className="home-top-navbar-search-bar"
      />

<Button className="home-top-navbar-create-user-button" color="primary"  onClick={() => setModalOpen(true)}>
      Create User
      </Button>

    </span>



    </Col>
  </Row>

        
            <ButtonGroup>

              <Button
              color="primary"
              outline={viewMode === 'table' ? false : true}
              onClick={() => setViewMode('table')}
              >
                <BsTable /> &nbsp;
              Table
              </Button>

              <Button
              color="primary"
              outline={viewMode === 'card' ? false : true}
              onClick={() => setViewMode('card')}
              >
                <BsCardList />&nbsp;
              Card
              </Button>

            </ButtonGroup>

            <br/><br/>


            {/* Display Users - Table or Cards */}
            {viewMode === 'table' ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map(user => (
                      <tr key={user.id}>
                        <td><img src={user.avatar} width='60' height='60' /></td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>

                        <div>
                          <Button color="primary" onClick={() => handleEditUser(user)}>
                          Edit
                          </Button>
                          {' '}
                          <Button color="danger" onClick={()=> handleDeleteUser(user.id)}>
                          Delete
                          </Button>
                        </div>

                        </td>
                      </tr>
                    ))}


                    {
                      currentUsers && currentUsers.length == 0 ? 

                      <tr>
                        <td colSpan={5}><center>No data </center></td>
                      </tr>
                      
                      : ''
                    }
                  </tbody>
                </Table>

                {/* Pagination */}
                <Pagination>
                  {Array.from({ length: pageCount }, (_, index) => (
                    <PaginationItem key={index + 1} active={index + 1 === currentPage}>
                      <PaginationLink onClick={() => handlePageClick(index + 1)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </Pagination>
              </>
            ) : (
              <>
                <Row>
                  {filteredUsersCard.map(user => (
                    <Col md="4" key={user.id} className="mb-3">
                      {/* <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                        <CardBody>
                          <center>
                        <img src={user.avatar} width='150' height='150'style={{borderRadius: "76px"}} />
                          <CardTitle tag="h5">{user.first_name} {' '} {user.last_name}</CardTitle>
                          <CardText>{user.email}</CardText>
                          </center>
                        </CardBody>
                      </Card> */}

<Card
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        position: 'relative',
        marginBottom: '20px',
        filter: isHovered  && user.id == isHoveredID ? "blur(0.2px)" : "none",
      }}
      onMouseEnter={() => { setIsHovered(true); setIsHoveredID(user.id) }   }
      onMouseLeave={() => { setIsHovered(false); setIsHoveredID(user.id) } }
    >
      <CardBody>
        <center>
          <img 
            src={user.avatar} 
            width="150" 
            height="150" 
            style={{ borderRadius: "76px" }} 
            alt={`${user.first_name} ${user.last_name}`}
          />
          <CardTitle tag="h5">{user.first_name} {user.last_name}</CardTitle>
          <CardText>{user.email}</CardText>

          {/* Show Edit and Delete buttons only when the card is hovered */}
          {isHovered && user.id == isHoveredID  && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
            }}>
              <Button color="primary" onClick={() => handleEditUser(user)}>Edit</Button>
              <Button color="danger" onClick={()=> handleDeleteUser(user.id)}>Delete</Button>
            </div>
          )}
        </center>
      </CardBody>
    </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>


      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Create New User</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={newUser}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateUser(values);
            setModalOpen(false); 
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="first_name">First Name *</Label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Enter First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.first_name && !!errors.first_name}
                />
                {touched.first_name && errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="last_name">Last Name *</Label>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Enter Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.last_name && !!errors.last_name}
                />
                {touched.last_name && errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="email">Email *</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="avatar">Avatar URL *</Label>
                <Input
                  type="text"
                  name="avatar"
                  id="avatar"
                  placeholder="Enter Avatar URL"
                  value={values.avatar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.avatar && !!errors.avatar}
                />
                {touched.avatar && errors.avatar && (
                  <div className="invalid-feedback">{errors.avatar}</div>
                )}
              </FormGroup>

              <ModalFooter>
                <Button color="primary" type="submit">
                  Create User
                </Button>
                <Button color="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>


    <Modal isOpen={modalOpenEdit} toggle={() => setModalOpenEdit(!modalOpenEdit)}>
  <ModalHeader toggle={() => setModalOpenEdit(!modalOpenEdit)}>
    Edit User
  </ModalHeader>
  <ModalBody>
    <Formik
      initialValues={editingUser || { first_name: '', last_name: '', email: '', avatar: '' }}
      validationSchema={validationSchema}
      enableReinitialize={true}  // Enable reinitialization with updated data
      onSubmit={(values) => {
        handleUpdateUser(values);
        setModalOpenEdit(false);  // Close the modal on submit
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="first_name">First Name *</Label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter First Name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.first_name && !!errors.first_name}
            />
            {touched.first_name && errors.first_name && (
              <div className="invalid-feedback">{errors.first_name}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="last_name">Last Name *</Label>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Enter Last Name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.last_name && !!errors.last_name}
            />
            {touched.last_name && errors.last_name && (
              <div className="invalid-feedback">{errors.last_name}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="email">Email *</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="avatar">Avatar URL *</Label>
            <Input
              type="text"
              name="avatar"
              id="avatar"
              placeholder="Enter Avatar URL"
              value={values.avatar}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={touched.avatar && !!errors.avatar}
            />
            {touched.avatar && errors.avatar && (
              <div className="invalid-feedback">{errors.avatar}</div>
            )}
          </FormGroup>

          <ModalFooter>
            <Button color="primary" type="submit">
              Update User
            </Button>
            <Button color="secondary" onClick={() => setModalOpenEdit(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  </ModalBody>
</Modal>


      <ToastContainer />
    </div>
  );
}

export default Home;
