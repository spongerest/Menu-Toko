require('dotenv').config({ path: '../../src/config/test.env' });


jest.mock('../../src/models/menuModel', () => ({
    Menu: { findAll: jest.fn() }
}));

jest.mock('../../src/services/orderService', () => ({
    orderService: { createOrder: jest.fn() },
    getOrderById: jest.fn()
}));

jest.mock('sequelize', () => {
        const actualSequelize = jest.requireActual('sequelize');
        return {
            ...actualSequelize,
            ValidationError: class ValidationError extends Error {}
        };
});

const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../../src/controllers/userController')

const app = express();
app.use(bodyParser.json());
app.get('/menu', userController.viewMenu);
app.post('/order', userController.createOrder);
app.get('/order/:id', userController.viewOrder);

const request = supertest(app);

describe('viewMenu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all menu items successfully', async () => {
        require('../../src/models/menuModel').Menu.findAll.mockResolvedValue([
            { name: 'Pizza', description: 'Cheese', price: 10 },
            { name: 'Pasta', description: "Carbonara", price: 15 }
        ]);

        const response = await request.get('/menu');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { name: 'Pizza', description: 'Cheese', price: 10 },
            { name: 'Pasta', description: "Carbonara", price: 15 }
        ]);
    });

    it('should return 500 if there is an error retrieving menu items', async () => {
        require('../../src/models/menuModel').Menu.findAll.mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request.get('/menu');

        expect(response.status).toBe(500);
        expect(response.text).toEqual("Error retrieving menu items");
    });
});


describe('createOrder', () => {
    it('should create an order successfully', async () => {
        const mockOrder = { id: 1, items: [{ menuItemId: 1, quantity: 2 }] };
        require('../../src/services/orderService').orderService.createOrder.mockResolvedValue(mockOrder);

        const response = await request.post('/order').send(mockOrder);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockOrder);
    });

    it('should return 500 for validation errors', async () => {
        const validationError = new Error('Error creating order');
        validationError.name = 'Error creating order';
        require('../../src/services/orderService').orderService.createOrder.mockRejectedValue(validationError);

        const response = await request.post('/order').send({});

        expect(response.status).toBe(500);
        expect(response.body.message).toEqual(validationError.message);
    });

    it('should return 500 for internal errors', async () => {
        require('../../src/services/orderService').orderService.createOrder.mockImplementation(() => {
            throw new Error('Internal error');
    });

    const response = await request.post('/order').send({ items: [] });

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual("Error creating order");
    });
});

describe('viewOrder', () => {
    it('should retrieve an order by ID successfully', async () => {
        const mockOrder = { id: 1, status: 'pending' };
        require('../../src/services/orderService').getOrderById.mockResolvedValue(mockOrder);

        const response = await request.get('/order/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrder);
    });

    it('should return 404 if order is not found', async () => {
        require('../../src/services/orderService').getOrderById.mockResolvedValue(null);

        const response = await request.get('/order/999');

    expect(response.status).toBe(404);
    expect(response.text).toEqual("Order not found");
    });

    it('should return 500 if there is an error retrieving the order', async () => {
        require('../../src/services/orderService').getOrderById.mockImplementation(() => {
        throw new Error('Database error');
    });

    const response = await request.get('/order/1');

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual("Error retrieving order details");
    });
});