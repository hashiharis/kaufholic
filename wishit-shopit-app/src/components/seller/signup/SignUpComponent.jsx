import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button'
import emailIcon from "../../../assets/email.svg";
import hidePassIcon from "../../../assets/hidePassIcon.svg";

import './signupcomponent.css'

export const SignUpComponent = () => {
  return (
    <div className="sign-up-section">
     
      <Form className='form'>
      <header id="signUpHeader">Sign up</header>
        <Form.Group className="mb-3">
          <Form.Label className="label">
            Name<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input" >
          <Form.Control type="text" placeholder="Enter name" className="form-input" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">
            Email<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input">
            <Form.Control type="email" placeholder="Enter email" className="form-input" />
            <InputGroup.Text>
              <img src={emailIcon} alt="icon-svg" className="icon-img"/>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">
            Password<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control type="password" placeholder="Enter Password" className="form-input" />
            <InputGroup.Text>
              <img src={hidePassIcon} alt="icon-svg" className="icon-img"/>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">
            Contact Number<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input">
            <Form.Control type="number" placeholder="Enter contact number"className="form-input"  />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-heading">
            Address<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input">
            <Form.Control type="number" placeholder="Enter address"className="form-input"  />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label"> 
           Pincode<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input">
            <Form.Control type="number" placeholder="Enter pincode" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">
            Description<sup>*</sup>
          </Form.Label>
          <InputGroup className="mb-3 input">
            <Form.Control as="textarea" type="number" placeholder="Enter description about the item to be sold" className="form-input"/>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit" className="sign-up-btn">
         Sign up
      </Button>
      </Form>
    </div>
  );
};
