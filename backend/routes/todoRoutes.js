const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new todo
router.post('/todos', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single todo by ID
router.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a todo by ID
router.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a todo by ID
router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
