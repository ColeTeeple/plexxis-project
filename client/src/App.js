import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Navbar } from "react-bootstrap";
import { usePlexxisPracticalContext } from "./context/PlexxisPracticalContext";
import AddEmployee from "./components/AddEmployee";
import EmployeeCard from "./components/EmployeeCard";
import UpdateEmployee from "./components/UpdateEmployee";
import Axios from "axios";

const App = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
  const { employees, setEmployees, API_URL } = usePlexxisPracticalContext();

  const getEmployees = async () => {
    await Axios.get(`${API_URL}/employees`).then((response) => {
      if (response.request.status == 200) {
        alert("Request successful.");
      }
      setEmployees(response.data);
    });
  };

  return (
    <>
      <h2 id="title">Employee Database</h2>
      <div className="buttons-container">
        <Button
          className="homepage-button"
          onClick={getEmployees}
          variant="dark"
        >
          View Employees
        </Button>
        <Button
          className="homepage-button"
          onClick={() => setShowAddEmployeeModal(true)}
          variant="dark"
        >
          Add Employee
        </Button>
        <Button
          className="homepage-button"
          onClick={() => setShowUpdateEmployeeModal(true)}
          variant="dark"
          style={{ marginBottom: "15px" }}
        >
          Update Employee
        </Button>
      </div>
      {employees.map((employee) => {
        return (
          <EmployeeCard
            id={employee.id}
            name={employee.name}
            code={employee.code}
            profession={employee.profession}
            color={employee.color}
            city={employee.city}
            branch={employee.branch}
            assigned={employee.assigned}
          />
        );
      })}

      <AddEmployee
        show={showAddEmployeeModal}
        handleClose={() => setShowAddEmployeeModal(false)}
      />
      <UpdateEmployee
        show={showUpdateEmployeeModal}
        handleClose={() => setShowUpdateEmployeeModal(false)}
      />
    </>
  );
};

export default App;
