const express = require("express");
const router = express.Router();
const { Employees } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfEmployees = await Employees.findAll();
    res.json(listOfEmployees);
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const employee = req.body;
    await Employees.create(employee);
    const listOfEmployees = await Employees.findAll();
    res.json(listOfEmployees);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:employeeId", async (req, res) => {
  const employeeId = parseInt(req.params.employeeId);
  try {
    if (!isNaN(employeeId) && employeeId > 0) {
      await Employees.update(req.body, { where: { id: employeeId } });
      res.json(employeeId);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:employeeId", async (req, res) => {
  const employeeId = parseInt(req.params.employeeId);

  try {
    if (!isNaN(employeeId) && employeeId > 0) {
      await Employees.destroy({ where: { id: employeeId } });
      res.json(employeeId);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
