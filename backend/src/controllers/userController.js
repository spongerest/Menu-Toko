const { orderService, getOrderById } = require('../services/orderService');
const { ValidationError } = require('sequelize');


exports.viewMenu = async (req, res) => {
    try {
        const menuItems = await Menu.findAll();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).send("Error retrieving menu items");
    }
};



exports.createOrder = async (req, res) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

exports.viewOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getOrderById(orderId);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving order details" });
    }
};
