const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocking external dependencies
jest.mock('../../src/models/userModel', () => ({
    User: {
        findOne: jest.fn()
    }
}));
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../src/services/menuService', () => ({
    addMenuItem: jest.fn(),
    getAllMenuItems: jest.fn(),
    updateMenuItem: jest.fn(),
    deleteMenuItem: jest.fn()
}));
jest.mock('../../src/services/orderService', () => ({
    getOrderById: jest.fn(),
    updateOrderStatus: jest.fn()
}));

const adminController = require('../../src/controllers/adminController');

// Setting up the Express server for testing
const app = express();
app.use(bodyParser.json());

// Defining routes for testing
app.post('/admin/login', adminController.adminLogin);
app.post('/menu', adminController.addMenuItem);
app.get('/menu', adminController.getAllMenuItems);
app.put('/menu/:id', adminController.updateMenuItem);
app.delete('/menu/:id', adminController.deleteMenuItem);
app.get('/order/:id', adminController.getOrder);
app.put('/order/:id', adminController.updateOrder);

const request = supertest(app);

describe('Admin Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('adminLogin', () => {
        it('should return 200 and a token for valid admin credentials', async () => {
            const mockUser = {
                id: 1,
                username: 'admin',
                password: bcrypt.hashSync('validPassword', 10),
                role: 'admin'
            };

            require('../../src/models/userModel').User.findOne.mockResolvedValue(mockUser);
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('fakeToken');
        
            const response = await request.post('/admin/login').send({
                username: 'admin',
                password: 'validPassword'
            });

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.user.role).toBe('admin');
        });

        it('should return 500 if there is an error during login', async () => {
            // Simulate an internal error during login
            require('../../src/models/userModel').User.findOne.mockImplementation(() => {
                throw new Error('Internal server error');
            });

            const response = await request.post('/admin/login').send({
                username: 'admin',
                password: 'invalidPassword' // Even though the password is marked invalid, the mocked error takes precedence
            });

            expect(response.status).toBe(500);
            expect(response.text).toEqual("Error during login");
        });
    });

    describe('addMenuItem Failure', () => {
        it('should handle errors when adding a menu item fails', async () => {
            require('../../src/services/menuService').addMenuItem.mockImplementation(() => {
                throw new Error('Failed to add menu item');
            });
    
            const menuItem = { name: 'New Pizza', price: 10 };
            const response = await request.post('/menu').send(menuItem);
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to add menu item' });
        });
    
    // Tests for updating a menu item
    describe('updateMenuItem Failure', () => {
        it('should handle errors when updating a menu item fails', async () => {
            require('../../src/services/menuService').updateMenuItem.mockImplementation(() => {
                throw new Error('Failed to update menu item');
            });
    
            const updatedItem = { name: 'Updated Pizza', price: 12 };
            const response = await request.put('/menu/1').send(updatedItem); // Assuming 1 is the ID
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to update menu item' });
        });
    });
    
    // Tests for deleting a menu item
    describe('deleteMenuItem Failure', () => {
        it('should handle errors when deleting a menu item fails', async () => {
            require('../../src/services/menuService').deleteMenuItem.mockImplementation(() => {
                throw new Error('Failed to delete menu item');
            });
    
            const response = await request.delete('/menu/1'); // Assuming 1 is the ID of the item to delete
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to delete menu item' });
        });
    });
    
    describe('getAllMenuItems', () => {
        // Reset mocks before each test to ensure a clean mock state
        beforeEach(() => {
            jest.clearAllMocks(); // Clears any previous mock implementation
        });
    
        it('should return all menu items successfully', async () => {
            const menuItems = [{ name: 'Pizza', price: 10 }, { name: 'Pasta', price: 15 }];
            require('../../src/services/menuService').getAllMenuItems.mockResolvedValue(menuItems);
    
            const response = await request.get('/menu');
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(menuItems);
        });
    
        it('should handle errors when fetching all menu items fails', async () => {
            // Mock the service to throw an error for this test
            require('../../src/services/menuService').getAllMenuItems.mockImplementation(() => {
                throw new Error('Failed to fetch menu items');
            });
    
            const response = await request.get('/menu');
    
            // Assert that the controller responds with a 404 status and an error message
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to fetch menu items' });
        });
    });

    // Tests for getting an order
    describe('getOrder Failure', () => {
        it('should return an error when the order is not found', async () => {
            // Mock the service to throw an error indicating the order is not found
            require('../../src/services/orderService').getOrderById.mockImplementation(() => {
                throw new Error('Order not found');
            });
    
            const response = await request.get('/order/1'); // Assuming 1 is a non-existent order ID
    
            // Assert that the controller responds with a 404 status and an error message
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Order not found' });
        });
    });
    
    // Tests for updating an order failure scenario
    describe('updateOrder Failure', () => {
        it('should return an error when updating an order fails', async () => {
            // Mock the service to throw an error indicating the update operation failed
            require('../../src/services/orderService').updateOrderStatus.mockImplementation(() => {
                throw new Error('Failed to update order');
            });
    
            const response = await request.put('/order/1').send({ status: 'completed' }); // Assuming 1 is the order ID
    
            // Assert that the controller responds with a 500 status and an error message, as per your updated failure handling
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to update order' });
        });
    });
});
});
