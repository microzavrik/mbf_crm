import { client } from "../database/db";
import { Category } from "./category"

export const getCategories = async (): Promise<Category[]> => {
    try {
        const result = await client.query('SELECT * FROM categories');
        return result.rows;
    } 
    catch (err) {
        throw new Error(`Unable to retrieve categories: ${err}`);
    }
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
        const result = await client.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to retrieve category: ${err}`);
    }
};

export const createCategory = async (category: Category): Promise<Category> => {
    const { owner, name, count } = category;
    try {
        const result = await client.query(
            'INSERT INTO categories (owner, name, count) VALUES ($1, $2, $3) RETURNING *',
            [owner, name, count]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to create category: ${err}`);
    }
};

export const updateCategory = async (id: number, category: Category): Promise<Category | null> => {
    const { owner, name, count } = category;
    try {
        const result = await client.query(
            'UPDATE categories SET owner = $1, name = $2, count = $3 WHERE id = $4 RETURNING *',
            [owner, name, count, id]
        );
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } 
    catch (err) {
        throw new Error(`Unable to update category: ${err}`);
    }
};

export const deleteCategory = async (id: number): Promise<Category | null> => {
    try {
        const result = await client.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } 
    catch (err) {
        throw new Error(`Unable to delete category: ${err}`);
    }
};

export const getCategoriesByOwner = async (owner: string): Promise<Category[]> => {
    try {
        const result = await client.query('SELECT * FROM categories WHERE owner = $1', [owner]);
        return result.rows;
    } 
    catch (err) {
        throw new Error(`Unable to retrieve categories by owner: ${err}`);
    }
};
