import express, { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByOwner,
} from '../models/productRepository';
import { Product } from '../models/product';

const router = express.Router();

router.post('/products', async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const createdProduct = await createProduct(product);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


router.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product: Product = req.body;
    const updatedProduct = await updateProduct(id, product);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteProduct(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/products/owner/:owner', async (req: Request, res: Response) => {
  try {
    const owner = req.params.owner;
    const products = await getProductsByOwner(owner);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;