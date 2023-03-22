import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { emailRegex, mobilePhoneRegex } from "../../Constant/regex";
import { v4 as uuid } from "uuid";
import { addContact, updateContact } from "./action";
import { map } from "lodash";

const ContactPopup = (props) => {
  const { show, updateData } = props || {};
  const [validationError, setValidationError] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    note: "",
  });

  useEffect(() => {
    if (updateData) {
      setData(updateData);
    }
  }, [updateData]);

  const setInputValidation = (name = "", value) => {
    const firstLetterCapitalName = name.charAt(0).toUpperCase() + name.slice(1);
    let errorObject = {};
    if (value.trim() === "") {
      errorObject[name] = {
        isError: true,
        errorMessage: `${
          name === "phoneNumber" ? "Mobile number" : firstLetterCapitalName
        } can't be empty`,
      };
    } else if (name === "email" && !value.match(emailRegex)) {
      errorObject[name] = {
        isError: true,
        errorMessage: `${firstLetterCapitalName} is invalid`,
      };
    } else if (name === "phoneNumber" && !mobilePhoneRegex.test(value)) {
      errorObject[name] = {
        isError: true,
        errorMessage: "Please Enter Number Only",
      };
    } else if (name === "phoneNumber" && value.length !== 10) {
      errorObject[name] = {
        isError: true,
        errorMessage: "Please enter valid Mobile Number",
      };
    } else {
      errorObject[name] = {
        isError: false,
        errorMessage: "",
      };
    }
    setValidationError({ ...validationError, ...errorObject });
    return errorObject;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target || {};
    setData({ ...data, [name]: value });
    setInputValidation(name, value);
  };

  const checkValidation = () => {
    let errors = {};
    map(data, (value, name) => {
      const errorObject = setInputValidation(name, value);
      errors = { ...errors, ...errorObject };
    });
    setValidationError(errors);
    return Object.values(errors).filter((item) => item?.isError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = checkValidation();
    if (valid) {
      if (data.id) {
        props.updateContact(data);
      } else {
        props.addContact({ ...data, id: uuid() });
      }
      closeModal();
    }
  };

  const closeModal = () => {
    props.handleClose();
    setData({});
    setValidationError({});
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{data.id ? "update" : "Add"} contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Name <span className="text-red">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={data.name || ""}
              onChange={onInputChange}
              placeholder="Enter name"
            />
            {validationError.name?.isError && (
              <span className="error-message">
                {validationError.name?.errorMessage}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Mobile Number <span className="text-red">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={data.phoneNumber || ""}
              onChange={onInputChange}
              placeholder="Enter mobile number"
            />
            {validationError.phoneNumber?.isError && (
              <span className="error-message">
                {validationError.phoneNumber?.errorMessage}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email <span className="text-red">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.email || ""}
              onChange={onInputChange}
            />
            {validationError.email?.isError && (
              <span className="error-message">
                {validationError.email?.errorMessage}
              </span>
            )}
            <Form.Group className="mb-3 mt-3" controlId="formNote">
              <Form.Label>
                Note <span className="text-red">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="note"
                placeholder="Please enter note"
                value={data.note || ""}
                onChange={onInputChange}
              />
              {validationError.note?.isError && (
                <span className="error-message">
                  {validationError.note?.errorMessage}
                </span>
              )}
            </Form.Group>
          </Form.Group>

          <Button variant="primary" type="submit">
            {data.id ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = {
  addContact,
  updateContact,
};

export default connect(null, mapDispatchToProps)(ContactPopup);
