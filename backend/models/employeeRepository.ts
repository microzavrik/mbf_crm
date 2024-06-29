import { Query, QueryResult } from "pg";
import { client } from "../database/db";
import { Employee } from "./employee";

export async function createEmplyoee(employee: Employee) : Promise<Employee> {
    try {
        const query = `
        INSERT INTO employees (username, full_name, company, position)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

        const values = [employee.username, employee.full_name, employee.company, employee.position];
        const result: QueryResult<Employee> = await client.query(query, values);
        return result.rows[0];
    }
    catch(error) {
        console.error("Error creating employee", error);
        throw error;
    }
};

export async function getEmployeeById(id: number) : Promise<Employee | null> {
    try {
        const query = "SELECT * FROM employees WHERE id= $1";
        const result: QueryResult<Employee> = await client.query(query, [id]);
        return result.rows[0] || null;
    }
    catch(error) {
        console.error("Error getting employee", error);
        throw error;
    }
};

export async function getAllEmployees() : Promise<Employee[]> {
    try {
        const query = "SELECT * FROM employees";
        const result: QueryResult<Employee> = await client.query(query);
        return result.rows;
    }
    catch(error) {
        console.error("Error getting all employees", error);
        throw error;
    }
}

export async function updateEmployee(id: number, updatedEmployee: Employee) : Promise<Employee | null> {
    try {
        const query = `
        UPDATE employees
        SET full_name = $1, company = $2, position = $3
        WHERE id = $4
        RETURNING *
        `;

        const values = [updatedEmployee.full_name, updatedEmployee.company, updatedEmployee.position, id];
        const result: QueryResult<Employee> = await client.query(query, values);
        return result.rows[0];
    }
    catch(error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

export async function deleteEmployee(id: number): Promise<void> {
    try {
        const query = "DELETE FROM employees WHERE id = $1";
        await client.query(query, [id]);
    }
    catch(error) {
        console.error("Error deleting employee", error);
        throw error;
    }
};

export async function getEmployeesByCompany(company: string) : Promise<Employee[]> {
    try {
        const query = "SELECT * FROM employees WHERE company = $1";
        const result: QueryResult<Employee> = await client.query(query, [company]);
        return result.rows;
    }
    catch(error) {
        console.error("Error getting employees by company: ", error);
        throw error;
    }
};