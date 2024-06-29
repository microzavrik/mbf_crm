import { Company } from "./company"
import { client } from "../database/db";
import { QueryResult } from "pg";

export async function createCompany(company: Company) : Promise<Company> {
    try {
        const query = `
        INSERT INTO companies (username, company_name, owner, activity_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

        const values = [company.username, company.company, company.owner, company.activityType];
        const result: QueryResult<Company> = await client.query(query, values);
        return result.rows[0];
    }
    catch(error) {
        console.error("Error creating company", error);
        throw error;
    }
};

export async function getCompanyByOwner(owner: string) : Promise<Company | null> {
    try {
        const query = "SELECT * FROM employees WHERE id= $1";
        const result: QueryResult<Company> = await client.query(query, [owner]);
        return result.rows[0] || null;
    }
    catch(error) {
        console.error("Error getting employee", error);
        throw error;
    }
};