import { Client, Query, QueryResult } from 'pg';

export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mbf_crm',
    password: '123123',
    port: 5432,
  });
  
  client.connect();