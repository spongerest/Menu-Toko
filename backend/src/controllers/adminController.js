const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const menuService = require('../services/menuService');
const { getOrderById, updateOrderStatus } = require('../services/orderService');

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send("Invalid credentials");
        }

        if (user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token: token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during login");
    }
};

exports.addMenuItem = async (req, res) => {
    try {
        const menuItem = await menuService.addMenuItem(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await menuService.getAllMenuItems();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await menuService.updateMenuItem(req.params.id, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        await menuService.deleteMenuItem(req.params.id);
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getOrderById(orderId);

        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;

        const updatedOrder = await updateOrderStatus(orderId, newStatus);

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
