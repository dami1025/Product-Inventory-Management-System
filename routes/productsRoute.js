import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

// Route for Save a new Product
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.quantity ||
      !request.body.date ||
      !request.body.category
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newProduct = {
        name: request.body.name,
        quantity: request.body.quantity,
        date: request.body.date,
        category: request.body.category,
    };

    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Products from database
router.get('/', async (request, response) => {
  try {
    const products = await Product.find({});

    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Product from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const product = await Product.findById(id);

    return response.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Product
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.name ||
        !request.body.quantity ||
        !request.body.date ||
        !request.body.category
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    const result = await Product.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Product
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Product not found' });
    }

    return response.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
