import express, { Request, Response } from 'express';
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByOwner,
} from '../models/categoryRepository';
import { Category } from '../models/category';

const router = express.Router();

router.get('/categories', async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/categories/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const category = await getCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/categories', async (req: Request, res: Response) => {
    const category: Category = req.body;
    try {
        const createdCategory = await createCategory(category);
        res.status(201).json(createdCategory);
    } 
    catch (error) {
        res.status(400).json({ error: error });
    }
});

router.put('/categories/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const category: Category = req.body;
    try {
        const updatedCategory = await updateCategory(id, category);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } 
    catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/categories/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const deletedCategory = await deleteCategory(id);
        if (deletedCategory) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/categories/owner/:owner', async (req: Request, res: Response) => {
    const owner = req.params.owner;
    try {
        const categories = await getCategoriesByOwner(owner);
        res.status(200).json(categories);
    } 
    catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
