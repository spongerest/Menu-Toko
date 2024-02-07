// File path: backend/test/models/orderModel.test.js

const { sequelize, Menu, Order } = require('../setupTest');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure the database is in a clean state
});

afterAll(async () => {
    await sequelize.close(); // Clean up the connection
});

describe('Order model', () => {
    test('Order creation works correctly', async () => {
        // Create a Menu item to associate with an Order
        const menu = await Menu.create({
            name: 'Margherita Pizza',
            description: 'Classic Margherita Pizza with fresh mozzarella cheese, tomatoes, and basil.',
            price: 15.00
        });

        // Create an Order
        const order = await Order.create({
            userId: 1,
            menuId: menu.id,
            quantity: 2,
            tableNumber: 4,
            totalPrice: 30.00
        });

        // Assertions to verify the Order was created correctly
        expect(order.userId).toBe(1);
        expect(order.menuId).toBe(menu.id);
        expect(order.quantity).toBe(2);
        expect(order.tableNumber).toBe(4);
        expect(order.totalPrice).toBe(30.00);
    });

    test('Order is associated with Menu correctly', async () => {
        const menu = await Menu.create({
            name: 'Veggie Pizza',
            description: 'Delicious pizza topped with bell peppers, olives, and onions.',
            price: 18.00
        });

        const order = await Order.create({
            userId: 2,
            menuId: menu.id,
            quantity: 1,
            tableNumber: 1,
            totalPrice: 18.00
        });

        // Fetch the associated Menu from the Order
        const associatedMenu = await order.getMenu();

        // Assertions to verify the association
        expect(associatedMenu.name).toBe('Veggie Pizza');
        expect(associatedMenu.price).toBe(18.00);
    });
});
