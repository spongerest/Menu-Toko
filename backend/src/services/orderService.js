const { Order, Menu } = require('../models');

const createOrder = async (orderData) => {
    if (orderData.quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
    }

    const menu = await Menu.findByPk(orderData.menuId);
    if (!menu) {
        throw new Error('Menu item not found');
    }

    const totalPrice = orderData.quantity * menu.price;

    const order = await Order.create({
        ...orderData,
        totalPrice: totalPrice
    });

    return order;
};

const getOrderById = async (orderId) => {
    const order = await Order.findByPk(orderId, {
        include: [{ model: Menu, as: 'menu' }]
    });

    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};

const updateOrderStatus = async (orderId, newStatus) => {
    const validStatuses = ['diproses', 'selesai', 'dibatalkan'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid order status');
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    order.status = newStatus;
    await order.save();
    return order;
};

module.exports = {
    createOrder,
    getOrderById,
    updateOrderStatus
};
