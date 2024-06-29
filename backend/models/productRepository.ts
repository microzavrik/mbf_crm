import { Pool } from 'pg';
import { Product } from './product';
import { client } from '../database/db';

export async function createProduct(product: Product): Promise<Product> {
    const { owner, name, category, units_sold, price } = product;
    const query = 'INSERT INTO products (owner, name, category, units_sold, price) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [owner, name, category, units_sold, price];
    
    const { rows } = await client.query<Product>(query, values);
    return rows[0];
};
  
export async function getAllProducts(): Promise<Product[]> {
    const query = 'SELECT * FROM products';
    const { rows } = await client.query<Product>(query);
    
    return rows;
};
  
export async function getProductById(id: number): Promise<Product | null> {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await client.query<Product>(query, [id]);
    
    return rows.length > 0 ? rows[0] : null;
};
  
  // Update a product
export async function updateProduct(id: number, product: Product): Promise<Product | null> {
    const { owner, name, category, units_sold, price } = product;
    const query = 'UPDATE products SET owner = $1, name = $2, category = $3, units_sold = $4, price = $5 WHERE id = $6 RETURNING *';
    const values = [owner, name, category, units_sold, price, id];
    
    const { rows } = await client.query<Product>(query, values);
    
    return rows.length > 0 ? rows[0] : null;
};
  

export async function deleteProduct(id: number): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = $1';
    const result = await client.query(query, [id]);
    return (result.rowCount as number) > 0;
};

export async function getProductsByOwner(owner: string): Promise<Product[]> {
    const query = 'SELECT * FROM products WHERE owner = $1';
    const { rows } = await client.query<Product>(query, [owner]);
    return rows;
};