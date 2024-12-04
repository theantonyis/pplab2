const express = require('express');
const Category = require("../models/category");
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
