import express, { Request, Response } from 'express';
import { createCompany, getCompanyByOwner } from '../models/companyRepository';
import { Company } from '../models/company';

const router = express.Router();

router.post('/companies', async (req: Request, res: Response) => {
  try {
    // const { username, activityType, company_name, owner } = req.body;
    // const newCompany = await createCompany({ username, company_name, owner, activityType });
    // res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error creating company' });
  }
});

router.get('/companies/owner/:owner', async (req: Request, res: Response) => {
  try {
    const { owner } = req.params;
    const company = await getCompanyByOwner(owner);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting company' });
  }
});

export default router;