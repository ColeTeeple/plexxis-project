import React from "react";
import { Card, Button } from "react-bootstrap";
import "../App.css";
import Axios from "axios";
import { usePlexxisPracticalContext } from "../context/PlexxisPracticalContext";

const EmployeeCard = ({
  id,
  name,
  code,
  profession,
  color,
  city,
  branch,
  assigned,
}) => {
  const { setEmployees, API_URL } = usePlexxisPracticalContext();

  const deleteEmployee = async (id) => {
    let employeeId = id;
    
    try {
      await Axios.delete(
        `${API_URL}/employees/delete/${employeeId}`
      ).then((response) => {
        console.log(response);
        if (response.request.status == 200) {
          alert("Employee deleted successfully.")
          setEmployees((prevEmployees) => {
            return prevEmployees.filter((val) => val.id != employeeId);
          });
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card id="card">
        <p>Name: {name}</p>
        <p>Code: {code}</p>
        <p>Profession: {profession}</p>
        <p>Color: {color}</p>
        <p>City: {city}</p>
        <p>Branch: {branch}</p>
        <p>Assigned: {assigned.toString()}</p>
        <Button onClick={() => deleteEmployee(id)} variant="dark">
          Delete Employee
        </Button>
      </Card>
    </>
  );
};

export default EmployeeCard;
