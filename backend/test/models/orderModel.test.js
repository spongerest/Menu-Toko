const { sequelize, Order, Menu } = require('../setupTest');
describe('Order model functionality', () => {
    let menu;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        // Create a Menu instance before creating an Order
        menu = await Menu.create({
            name: 'Margherita Pizza',
            description: 'A delicious tomato and cheese pizza.',
            price: 10.00
        });
    });

    it('should create and retrieve an Order with all fields', async () => {
        const testOrder = {
            userId: 1,
            menuId: menu.id, // Use the existing Menu instance's ID
            quantity: 2,
            tableNumber: 3,
            totalPrice: 20.00,
        };
        const order = await Order.create(testOrder);

        expect(order.userId).toBe(testOrder.userId);
        expect(order.menuId).toBe(testOrder.menuId);
        expect(order.quantity).toBe(testOrder.quantity);
        expect(order.tableNumber).toBe(testOrder.tableNumber);
        expect(order.totalPrice).toBe(testOrder.totalPrice);
    });
});
