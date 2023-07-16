import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { usePlexxisPracticalContext } from "../context/PlexxisPracticalContext";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateEmployee = ({ show, handleClose, id }) => {
  const nameRef = useRef();
  const codeRef = useRef();
  const professionRef = useRef();
  const colorRef = useRef();
  const cityRef = useRef();
  const branchRef = useRef();
  const assignedRef = useRef();
  const { employees, setEmployees, colors, branches, API_URL } =
    usePlexxisPracticalContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).max(40).required("Name is required"),
    code: Yup.string().min(4).max(4).required("Code must be 4 characters"),
    profession: Yup.string()
      .min(3)
      .max(30)
      .required("Profession must be between 3 and 30 characters"),
    color: Yup.string().required("Color is required"),
    city: Yup.string()
      .min(3)
      .max(25)
      .required("City must be between 3 and 25 characters"),
    branch: Yup.string().required("Branch is required"),
    assigned: Yup.boolean().required("Assigned is required"),
  });

  let initialValues = {
    name: "",
    code: "",
    profession: "",
    color: colors[0],
    city: "",
    branch: branches[0],
    assigned: false,
  };

  const submit = async (e) => {
    handleClose();
    let employeeId = employees.find(
      (employee) => employee.name == nameRef.current.value
    ).id;
    let updatedEmployee = {
      id: employeeId,
      name: nameRef.current.value,
      code: codeRef.current.value,
      profession: professionRef.current.value,
      color: colorRef.current.value,
      city: cityRef.current.value,
      branch: branchRef.current.value,
      assigned: assignedRef.current.value,
    };

    try {
      await Axios.put(
        `${API_URL}/employees/update/${employeeId}`,
        updatedEmployee
      ).then((response) => {
        if (response.request.status == 200) {
          alert("Employee updated successfully.");
          let newArr = [...employees];
          const index = newArr.findIndex(
            (employee) => employee.id === employeeId
          );
          newArr[index] = updatedEmployee;
          setEmployees(newArr);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(180, 203, 224, 0.8)" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field
                as="select"
                type="text"
                name="name"
                className="form-control"
                innerRef={nameRef}
              >
                {employees.map((employee) => {
                  return <option value={employee.name}>{employee.name}</option>;
                })}
              </Field>
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="code">Code:</label>
              <Field
                type="text"
                name="code"
                className="form-control"
                innerRef={codeRef}
              />
              <ErrorMessage name="code" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="profession">Profession:</label>
              <Field
                type="text"
                name="profession"
                className="form-control"
                innerRef={professionRef}
              />
              <ErrorMessage
                name="profession"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <Field
                as="select"
                type="text"
                name="color"
                className="form-control"
                innerRef={colorRef}
              >
                {colors.map((color) => {
                  return <option value={color}>{color}</option>;
                })}
              </Field>
              <ErrorMessage name="color" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <Field
                type="text"
                name="city"
                className="form-control"
                innerRef={cityRef}
              />
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch:</label>
              <Field
                as="select"
                type="text"
                name="branch"
                className="form-control"
                innerRef={branchRef}
              >
                {branches.map((branch) => {
                  return <option value={branch}>{branch}</option>;
                })}
              </Field>
              <ErrorMessage name="branch" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="assigned">Assigned:</label>
              <Field
                as="select"
                type="text"
                name="assigned"
                className="form-control"
                innerRef={assignedRef}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Field>
              <ErrorMessage
                name="assigned"
                component="div"
                className="error"
                color="red"
              />
            </div>

            <Button type="submit" variant="dark">
              Update
            </Button>
            <Button onClick={handleClose} variant="dark">
              Close
            </Button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployee;
