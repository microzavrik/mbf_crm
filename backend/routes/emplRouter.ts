import express, { Request, Response } from "express"
import { 
    createEmplyoee,
    getEmployeeById, 
    getEmployeesByCompany,
    getAllEmployees,
    updateEmployee,
    deleteEmployee } from "../models/employeeRepository"
import { Employee } from "../models/employee"
import { create } from "domain";
import { createCompany } from "../models/companyRepository";
import { Company } from "../models/company";

const router = express.Router();

router.post("/employees", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { username, full_name, company, position, activityType } = req.body;
    console.log(username, full_name, company, position);
    const newEmployee = await createEmplyoee({ username, full_name, company, position });

    const companyObject: Company = {
      username: username,
      company: company,
      owner: full_name,
      activityType: activityType
    };

    await createCompany(companyObject);

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee" });
  }
});

router.get("/employees/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await getEmployeeById(parseInt(id));
        if(employee) {
            res.json(employee);
        }
        else {
            res.status(404).json({error: "Employee not found"});
        }
    }
    catch(error) {
        res.status(500).json({error: "Error getting emplyoee"});
    }
});

router.get("/employees", async (req: Request, res: Response) => {
    try {
        const employees = await getAllEmployees();
        res.json(employees);
    }
    catch(error) {
        res.status(500).json({error: "Error getting all employes"});
    }
});

router.put('/employees/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { username, full_name, company, position } = req.body;
      const updatedEmployee = await updateEmployee(parseInt(id), { username, full_name, company, position });
      if (updatedEmployee) {
        res.json(updatedEmployee);
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } 
    catch (error) {
      res.status(500).json({ error: 'Error updating employee' });
    }
  });
  
  router.delete('/employees/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteEmployee(parseInt(id));
      res.status(204).send();
    } 
    catch (error) {
      res.status(500).json({ error: 'Error deleting employee' });
    }
  });
  
  router.get('/employees/company/:company', async (req: Request, res: Response) => {
    try {
      const { company } = req.params;
      const employees = await getEmployeesByCompany(company);
      res.json(employees);
    } 
    catch (error) {
      res.status(500).json({ error: 'Error getting employees by company' });
    }
  });
  
  export default router;